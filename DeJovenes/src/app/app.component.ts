import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  form: FormGroup;


  constructor(formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(5)]],
      apellidos: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', Validators.required, Validators.email],
      dni: ['', Validators.required, Validators.pattern('^[0-9]{8}[A-Z]$')],
      archivo: [null, Validators.required],
      fechaNacimiento: ['', [Validators.required]],
      sexo: ['', Validators.required],
      intereses: ['', Validators.required],
      codigoPostal: ['', Validators.required, Validators.pattern('^[0-9]{5}$')],
      provincia: ['', Validators.required],
      situacionLaboral: ['', Validators.required],
      terminos: [false, Validators.required]
    })
  }

}
