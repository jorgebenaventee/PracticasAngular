import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Articulo, DatosForm } from '../../app.component';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [MatDialogModule, CommonModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent {
 constructor(@Inject(MAT_DIALOG_DATA) public data: {datos: DatosForm, articulos: Articulo[]}, private http: HttpClient) {
   this.http.post('URL_SERVICIO_JAVA', {}).subscribe()
 }
}
