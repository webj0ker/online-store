import Products from './products/products'
import Categories from './categories/categories'
import {SrcItem} from '../base/base'

export class AppView {
  public products: Products
  public categories: Categories

  constructor() {
    this.products = new Products()
    this.categories = new Categories()
  }

  public drawProducts(data: SrcItem[]) {
    const values: SrcItem[] = data ?? []
    this.products.draw(values)
  }

  public drawCategories(values: SrcItem[] = []) {
    this.categories.draw(values)
  }
}

export default AppView
