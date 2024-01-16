import { Component } from '@angular/core'
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

  handleFormSubmit(event: Cart[number]) {
    const existingProduct = this.cart.find(
      ({ product }) => product.id === event.product.id,
    )
    if (existingProduct) {
      existingProduct.quantity += event.quantity
    } else {
      this.cart.push(event)
    }
  }

  handleRemoveItem(productId: number) {
    this.cart = this.cart.filter(({ product }) => product.id !== productId)
  }
}
