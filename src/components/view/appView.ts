import Products from './products/products'
import Categories from './categories/categories'
import Filters from './filter/filter'
import {SrcItem} from '../base/base'
import viewModal from './modal/modal'

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
    this.toggleView()
  }

  private toggleView() {
    const btnList = document.querySelectorAll('.btn')
    btnList.forEach((item) => {
      item.addEventListener('click', (e: Event) => {
        const btn = e.currentTarget as Element
        document
          .querySelectorAll('.btn')
          .forEach((value: Element) => value.classList.remove('active'))
        btn.classList.add('active')
        if (btn.classList.contains('list-view')) {
          document.querySelector('.products').classList.remove('grid-view')
          document.querySelector('.products').classList.add('list-view')
        } else {
          document.querySelector('.products').classList.remove('list-view')
          document.querySelector('.products').classList.add('grid-view')
        }
      })
    })
  }

  public drawProducts(data: SrcItem[]) {
    this.filters.draw(data)
    this.filters.updateURL()
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
              : 3000) &&
          value.rating > this.filters.viewFilter.minRating &&
          value.rating <
            (this.filters.viewFilter.maxRating > 0
              ? this.filters.viewFilter.maxRating
              : 5)

        return result
      }) ?? []
    //sort
    const sortControl = document.querySelector(
      '.form-control'
    ) as HTMLSelectElement
    values.sort((a: SrcItem, b: SrcItem) => {
      if (sortControl.selectedIndex === 0) return a.price - b.price
      if (sortControl.selectedIndex === 1) return b.price - a.price
      if (sortControl.selectedIndex === 2) return a.rating - b.rating
      if (sortControl.selectedIndex === 3) return b.rating - a.rating
    })
    this.products.draw(values)
    viewModal()
  }

  public drawCategories(values: SrcItem[] = []) {
    this.categories.draw(values)
  }

  public drawFilters(values: SrcItem[] = []) {
    this.filters.draw(values)
  }
}

export default AppView
