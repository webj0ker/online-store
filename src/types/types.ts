interface ProductItem {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand: string
  category: string
  thumbnail: string
  images: Array<string>
}

type ProductItems = {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand: string
  category: string
  thumbnail: string
  images: Array<string>
}

interface OptionsInterface {
  sources?: string
}

interface QueryOptionsInterface {
  endpoint: string
  options?: OptionsInterface
}

type CallbackType<T> = (data: T) => void
