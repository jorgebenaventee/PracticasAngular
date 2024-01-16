type Product = {
  id: number
  name: string
  price: number
}

type Cart = {
  product: Product
  quantity: number
}[]
