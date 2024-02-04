import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {ComunidadService} from "./services/comunidad.service";
import {Community, Province, Town} from "./index";
import {MatFormField, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect, MatSelectChange, MatSelectModule} from "@angular/material/select";
import {MatOptionModule} from "@angular/material/core";
import {MatInputModule} from "@angular/material/input";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatFormFieldModule, MatSelectModule, MatInputModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  comunidades: Community[] = [];
  provincias: Province[] = []
  localidades: Town[] = []

  private selectedComunidad: string = ''
  private selectedProvincia: string = ''

  @ViewChild('comunidadSelect') comunidadSelect: ElementRef<HTMLSelectElement>

  constructor(private comunidadService: ComunidadService) {
    this.comunidadService.getCommunities().subscribe(comunidades => {
      this.comunidades = comunidades;
      this.comunidadService.getProvinces(this.comunidades[0].code).subscribe(provincias => {
        this.provincias = provincias;
        this.comunidadService.getTowns(this.comunidades[0].code, provincias[0].code).subscribe(localidades => this.localidades = localidades)
      })
    });
  }


  onComunidadChange(event: MatSelectChange) {
    this.provincias = []
    this.localidades = []
    this.selectedComunidad = event.value ?? this.comunidades[0].code
    this.selectedProvincia = ''
    this.comunidadService.getProvinces(this.selectedComunidad).subscribe(provincias => {
      this.provincias = provincias;
      this.comunidadService.getTowns(this.selectedComunidad, provincias[0].code).subscribe(localidades => this.localidades = localidades)
    })
  }

  onProvinciaChange(event: MatSelectChange) {
    this.localidades = []
    this.selectedProvincia = event.value ?? this.provincias[0].code
    this.comunidadService.getTowns(this.selectedComunidad, this.selectedProvincia).subscribe(localidades => this.localidades = localidades)
  }
}
