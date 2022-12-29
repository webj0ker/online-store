export interface Options {
  [key: string]: string | undefined
}

export interface Config<SrcItem> {
  callback?: (data: SrcItem[]) => void
  options?: Options
}

export interface ViewFilter {
  brands: string[]
  minRating: number
  maxRating: number
  minPrice: number
  maxPrice: number
}

export interface FilterProduct {
  category: string
  name: string
  stock: number
}
export interface FilterParams {
  brand: FilterProduct[]
  minRating: number
  maxRating: number
  minPrice: number
  maxPrice: number
}
export interface RespItem {
  products: SrcItem[]
  total: number
  skip: number
  limit: number
}

export interface SrcItem {
  id: string
  title: string
  price: number
  discountPercentage: string
  rating: number
  stock: number
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
