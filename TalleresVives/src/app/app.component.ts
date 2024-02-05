import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  log(event: MouseEvent) {
    console.log(event)
  }
  title = 'TalleresVives';
  form = this.formBuilder.group({
    numeroFactura: ['', [Validators.required, Validators.minLength(5)]],
    fecha: ['', [Validators.required]],
    nombreCliente: ['', [Validators.required]],
    direccion: ['', [Validators.required]],
  });
  constructor(private formBuilder: FormBuilder) { }
}
