import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {HeaderComponent} from "./components/header/header.component";
import {MatStep, MatStepper, MatStepperNext} from "@angular/material/stepper";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatDialog} from "@angular/material/dialog";
import {ResultDialogComponent} from "./components/result-dialog/result-dialog.component";

const matchValidator = (otherControl: string) => (control: FormControl) => {
  const parent = control.parent;
  if (!parent) {
    return null;
  }

  const otherControlValue = parent.get(otherControl)?.value;

  return control.value === otherControlValue ? null : {match: true};
}

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [MatDialog],
  imports: [CommonModule, RouterOutlet, HeaderComponent, MatStepper, MatStep, ReactiveFormsModule, MatFormField, MatInput,
    MatLabel, MatError, MatStepperNext, MatButton, MatSelect, MatOption, MatRadioGroup, MatRadioButton, MatCheckbox],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  datosPersonalesForm: FormGroup
  preferenciasForm: FormGroup

  constructor(formBuilder: FormBuilder, private dialog: MatDialog) {
    this.datosPersonalesForm = formBuilder.group({
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern('[679][0-9]{8}')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, matchValidator('password')]]
    })

    this.preferenciasForm = formBuilder.group({
      clases: [[], [Validators.required, Validators.minLength(1)]],
      sexo: ['', Validators.required],
      terminos: [false, Validators.requiredTrue]
    })
  }


  openDialog() {
    this.dialog.open(ResultDialogComponent, {
      data: {
        datosPersonalesForm: this.datosPersonalesForm.value,
        preferenciasForm: this.preferenciasForm.value
      },
      width: '50%',
      height: '50%'
    })
  }
}
