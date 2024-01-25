import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from "@angular/forms";
import {codigosPostales} from "./codigos-postales";

const beforeDateValidator = (date: Date) => (control: AbstractControl): ValidationErrors | null => {
  const value = control.value

  const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/

  if (!value) {
    return null;
  }

  if (!dateRegex.test(value)) {
    return {invalidDate: true}
  }

  const [day, month, year] = value.split('/')

  const inputDate = new Date(`${year}-${month}-${day}`)

  if (inputDate.getTime() > date.getTime()) {
    return {beforeDate: true}
  }

  return null;
}

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
      email: ['', [Validators.required, Validators.email]],
      dni: ['', [Validators.required, Validators.pattern('^[0-9]{8}[A-Z]$')]],
      archivo: [null, Validators.required],
      fechaNacimiento: ['', [Validators.required, beforeDateValidator(new Date())]],
      sexo: ['', Validators.required],
      intereses: [[], [Validators.required, Validators.minLength(1)]],
      codigoPostal: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],
      provincia: ['', Validators.required],
      situacionLaboral: ['', Validators.required],
      terminos: [false, Validators.requiredTrue]
    },)

    this.form.get('provincia')?.disable()
  }


  onCodigoPostalChange({target}: Event) {
    if (!(target instanceof HTMLInputElement)) return;
    const provinciaControl = this.form.get('provincia')
    if (target.value.length < 2) {
      provinciaControl?.setValue('')
      return
    }

    const value = target.value.slice(0, 2)

    const cps = Object.entries(codigosPostales)

    const provincia = cps.find(([cp]) => cp.startsWith(value))?.[1]

    if (!provincia) {
      provinciaControl?.setValue('')
      return
    }

    provinciaControl?.setValue(provincia)

  }

  onSubmit(event: Event) {
    event.preventDefault()
    const list = Object.entries(this.form.value).map(([key, value]) => `${key}: ${value}`).join('\n')
    alert(list)
  }
}
