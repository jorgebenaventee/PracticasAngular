import { Component, EventEmitter, Input, Output } from '@angular/core'
import { CurrencyPipe } from '@angular/common'
import { NgIconComponent, provideIcons } from '@ng-icons/core'
import { tablerTrash } from '@ng-icons/tabler-icons'

@Component({
  selector: 'app-product-table',
  standalone: true,
  imports: [CurrencyPipe, NgIconComponent],
  providers: [provideIcons({ tablerTrash })],
  templateUrl: './product-table.component.html',
  styleUrl: './product-table.component.css',
})
export class ProductTableComponent {
  @Input() cart: Cart
  @Output() removeItem: EventEmitter<number> = new EventEmitter<number>()

  handleRemoveItem(item: Cart[number]) {
    this.removeItem.emit(item.product.id)
  }
}
