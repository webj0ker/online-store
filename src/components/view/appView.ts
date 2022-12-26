import Products from './products/products'
import Categories from './categories/categories'
import Filters from './filter/filter'
import {SrcItem} from '../base/base'

export class AppView {
  public products: Products
  public categories: Categories
  public filters: Filters

  constructor() {
    this.products = new Products()
    this.categories = new Categories()
    this.filters = new Filters()
  }

  public drawProducts(data: SrcItem[]) {
    const values: SrcItem[] = data ?? []
    this.products.draw(values)
    this.filters.draw(values)
  }

  public drawCategories(values: SrcItem[] = []) {
    this.categories.draw(values)
  }

  public drawFilters(values: SrcItem[] = []) {
    this.filters.draw(values)
  }
}

export default AppView
