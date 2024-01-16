import {
  Component,
  computed,
  EventEmitter,
  Output,
  signal,
} from '@angular/core'
import { FormsModule } from '@angular/forms'
import { CurrencyPipe } from '@angular/common'

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [FormsModule, CurrencyPipe],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css',
})
export class ProductFormComponent {
  @Output() formSubmit: EventEmitter<Cart[number]> = new EventEmitter<
    Cart[number]
  >()
  products: Product[] = [
    {
      id: 1,
      name: 'Pistola',
      price: 0.45,
    },
    {
      id: 2,
      name: 'Baguette',
      price: 0.85,
    },
    {
      id: 3,
      name: 'Hogaza',
      price: 1.05,
    },
  ]

  productValue = signal(this.products[0].id)
  quantityValue = signal(1)
  priceValue = computed(() => {
    const product = this.products.find(
      (product) => product.id === this.productValue(),
    )
    return product?.price ?? 0
  })
  totalValue = computed(() => {
    return this.priceValue() * this.quantityValue()
  })
  validForm = computed(() => {
    return this.quantityValue() > 0 && this.productValue() > 0
  })

  onProductChange(event: string) {
    this.productValue.set(Number(event))
  }

  onQuantityChange(event: string) {
    this.quantityValue.set(Number(event))
  }

  handleSubmit(event: SubmitEvent) {
    event.preventDefault()
    this.formSubmit.emit({
      product: this.products.find(
        (product) => product.id === this.productValue(),
      )!,
      quantity: this.quantityValue(),
    })
  }
}
