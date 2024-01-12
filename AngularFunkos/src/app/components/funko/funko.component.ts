import { Component, Input } from '@angular/core'
import { CurrencyPipe } from '@angular/common'

@Component({
  selector: 'app-funko',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './funko.component.html',
  styleUrl: './funko.component.css',
})
export class FunkoComponent {
  @Input() funko: Funko
}
