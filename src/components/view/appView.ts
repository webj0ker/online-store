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
    this.filters.viewFilter.brands = []
    this.filters.viewFilter.minPrice = 0
    this.filters.viewFilter.maxPrice = 0
    this.filters.viewFilter.minRating = 0
    this.filters.viewFilter.maxRating = 0
  }

  public drawProducts(data: SrcItem[]) {
    this.filters.draw(data)
    const values: SrcItem[] =
      data.filter((value: SrcItem) => {
        let result = true
        if (this.filters.viewFilter.brands.length > 0)
          result = this.filters.viewFilter.brands.includes(value.brand)
        result =
          result &&
          value.price > this.filters.viewFilter.minPrice &&
          value.price <
            (this.filters.viewFilter.maxPrice > 0
              ? this.filters.viewFilter.maxPrice
              : 1000) &&
          value.rating > this.filters.viewFilter.minRating &&
          value.rating <
            (this.filters.viewFilter.maxRating > 0
              ? this.filters.viewFilter.maxRating
              : 5)

        return result
      }) ?? []

    this.products.draw(values)
  }

  public drawCategories(values: SrcItem[] = []) {
    this.categories.draw(values)
  }

  public drawFilters(values: SrcItem[] = []) {
    this.filters.draw(values)
  }
}

export default AppView
