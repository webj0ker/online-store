export interface Options {
  [key: string]: string | undefined
}

export interface Config<SrcItem> {
  callback?: (data: SrcItem[]) => void
  options?: Options
}

export interface RespItem {
  products: SrcItem[]
  total: Number
  skip: Number
  limit: Number
}

export interface SrcItem {
  id: string
  title: string
  price: string
  discountPercentage: string
  rating: string
  stock: string
  brand: string
  category: string
  description: string
  thumbnail: string
  images: string[]
}

export interface SrcData {
  products: SrcItem[]
}

export type Nullable<T> = T | null
