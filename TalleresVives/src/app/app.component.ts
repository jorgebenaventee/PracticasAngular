import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { codigosPostales } from '../utils';
import { DialogComponent } from './components/dialog/dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

export type Articulo = {
  linea: number,
  articulo: string,
  cantidad: number,
  precio: number,
  iva: number
  tipoIva: number
  total: number
}

export type DatosForm = {
  numeroFactura: string,
  fecha: string,
  nombreCliente: string,
  direccion: string,
  codigoPostal: string,
  provincia: string,
  ciudad: string,
  telefono: string,
  tipoDocumento: string,
  documento: string,
  email: string
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatSelectModule, MatButtonModule, MatTableModule, DialogComponent, MatDialogModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  datosForm = this.formBuilder.group({
    numeroFactura: ['', [Validators.required, Validators.minLength(5)]],
    fecha: ['', [Validators.required]],
    nombreCliente: ['', [Validators.required]],
    direccion: ['', [Validators.required]],
    codigoPostal: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],
    provincia: ['', [Validators.required]],
    ciudad: ['', Validators.required],
    telefono: ['', [Validators.required, Validators.pattern(/[679]\d{8}/)]],
    tipoDocumento: ['', Validators.required],
    documento: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]]
  });

  articulosForm = this.formBuilder.group({
    articulo: ['', Validators.required],
    cantidad: ['', Validators.required],
    precio: ['', Validators.required],
    tipoIva: ['', Validators.required]
  })


  columnsToDisplay = ['linea', 'articulo', 'cantidad', 'precio', "tipoIva", 'iva', 'total',]

  articulos: Articulo[] = []

  totales = {
    baseImponible21: 0,
    iva21: 0,
    baseImponible10: 0,
    iva10: 0,
    baseImponible4: 0,
    iva4: 0,
    total: 0
  }
  constructor(private formBuilder: FormBuilder, private dialog: MatDialog) {
    this.datosForm.get('provincia')?.disable()
  }

  addArticulo() {
    if (this.articulosForm.invalid) {
      return;
    }
    const linea = this.articulos.length + 1
    const articuloNombre = this.articulosForm.get('articulo')!.value!
    const cantidad = Number(this.articulosForm.get('cantidad')!.value!)
    const precio = Number(this.articulosForm.get('precio')!.value!)
    const tipoIva = Number(this.articulosForm.get('tipoIva')!.value!)
    const iva = precio * tipoIva
    const total = precio * cantidad + iva
    const articulo: Articulo = {
      linea,
      articulo: articuloNombre,
      cantidad,
      precio,
      iva,
      tipoIva,
      total
    }
    this.articulos = [...this.articulos, articulo]
    this.calcularTotales()
  }


  onCodigoPostalChange() {
    const codigoPostal = this.datosForm.get('codigoPostal')!.value
    if (!codigoPostal || codigoPostal.length < 2) {
      this.datosForm.get('provincia')?.setValue(null)
      return;
    }

    const provincia = Object.entries(codigosPostales).find(([cp]) => {
      return cp.startsWith(codigoPostal)
    })?.[1]

    this.datosForm.get('provincia')?.setValue(provincia ?? null)
  }

  borrarArticulo(articulo: Articulo) {
    this.articulos = this.articulos.filter(a => a.linea !== articulo.linea)
    this.calcularTotales()
  }


  private calcularTotales() {
    const baseImponible21 = this.articulos.filter(a => a.tipoIva === 0.21).reduce((acc, articulo) => {
      return acc + articulo.precio
    }, 0)

    const iva21 = baseImponible21 * 0.21

    const baseImponible10 = this.articulos.filter(a => a.tipoIva === 0.10).reduce((acc, articulo) => {
      return acc + articulo.precio
    }, 0)

    const iva10 = baseImponible10 * 0.10

    const baseImponible4 = this.articulos.filter(a => a.tipoIva === 0.04).reduce((acc, articulo) => {
      return acc + articulo.precio
    }, 0)

    const iva4 = baseImponible4 * 0.04

    const total = this.articulos.reduce((acc, articulo) => {
      return acc + articulo.total
    }, 0)

    this.totales = {
      baseImponible21,
      iva21,
      baseImponible10,
      iva10,
      baseImponible4,
      iva4,
      total
    }
  }

  showDialog() {
    this.dialog.open(DialogComponent, {
      data: {
        datos: this.datosForm.value,
        articulos: this.articulos
      }
    })
  }

}
