import { Component, ElementRef, ViewChild } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterOutlet } from '@angular/router'
import { ProductFormComponent } from './components/product-form/product-form.component'
import { ProductTableComponent } from './components/product-table/product-table.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ProductFormComponent,
    ProductTableComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  cart: Cart = []
  total: number = 0

  @ViewChild('dialog') dialog: ElementRef<HTMLDialogElement>

  handleFormSubmit(event: Cart[number]) {
    const existingProduct = this.cart.find(
      ({ product }) => product.id === event.product.id,
    )
    if (existingProduct) {
      existingProduct.quantity += event.quantity
    } else {
      this.cart.push(event)
    }
    this.calculateTotal()
  }

  handleRemoveItem(productId: number) {
    this.cart = this.cart.filter(({ product }) => product.id !== productId)
    this.calculateTotal()
  }

  showModal() {
    this.dialog.nativeElement.showModal()
  }

  private calculateTotal() {
    this.total = this.cart.reduce(
      (acc, { product, quantity }) => acc + product.price * quantity,
      0,
    )
  }
}
