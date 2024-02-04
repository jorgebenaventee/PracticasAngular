import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

type Form = {
  [key: string]: unknown
}

@Component({
  selector: 'app-result-dialog',
  standalone: true,
  imports: [],
  templateUrl: './result-dialog.component.html',
  styleUrl: './result-dialog.component.css'
})
export class ResultDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { datosPersonalesForm: Form, preferenciasForm: Form }) {
  }


  getClases() {
    if (!Array.isArray(this.data.preferenciasForm['clases'])) {
      return ''
    }

    return this.data.preferenciasForm['clases'].join(', ')
  }

}
