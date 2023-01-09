import AppController from '../controller/controller'
import {AppView} from '../view/appView'
import {Nullable, SrcItem} from '../base/base'
import initialize from '../view/order/order'

class App {
  public controller: AppController
  public view: AppView

  constructor() {
    this.controller = new AppController()
    this.view = new AppView()
  }

  public get products(): SrcItem[] {
    return this.controller.products
  }

  public filterCategories(value: string): SrcItem[] {
    return this.controller.categories.filter((item: SrcItem) =>
      item.category.toLowerCase().includes(value.toLowerCase())
    )
  }
  public filterProducts(value: string): SrcItem[] {
    return this.controller.products.filter((item: SrcItem) =>
      item.title.toLowerCase().includes(value.toLowerCase())
    )
  }

  private parseUrl() {
    function getCurrentURL() {
      return window.location.href
    }
    const url = getCurrentURL()
    const filterUrl = url.split('?')
    filterUrl.forEach((value: string) => {
      console.log(value)
      if (value.indexOf('category=') !== -1)
        this.view.filters.viewFilter.category = value ? value.slice(9) : ''
      if (value.indexOf('brands=') !== -1)
        this.view.filters.viewFilter.brands = value
          ? value.slice(6).split(',')
          : []
      if (value.indexOf('price=') !== -1) {
        this.view.filters.viewFilter.minPrice = value
          ? Number(value.slice(6).split(',')[0])
          : 0
        this.view.filters.viewFilter.maxPrice = value
          ? Number(value.slice(6).split(',')[1])
          : 0
      }
      if (value.indexOf('rating=') !== -1) {
        this.view.filters.viewFilter.minRating = value
          ? Number(value.slice(7).split(',')[0])
          : 0
        this.view.filters.viewFilter.maxRating = value
          ? Number(value.slice(7).split(',')[1])
          : 0
      }
    })

    const findCategory = this.view.filters.viewFilter.category
    const listCategory =
      document.querySelectorAll<HTMLElement>('.category__item')
    listCategory.forEach((category: HTMLElement) => {
      if (category.textContent === findCategory) {
        this.update(category)
        return
      }
    })
  }

  public start() {
    const filterInput: Nullable<HTMLInputElement> =
      document.querySelector('.filter__input')
    document
      ?.querySelector('.categories')
      ?.addEventListener('click', (e: Event) =>
        this.controller.getProducts(e, (data: SrcItem[]) => {
          this.view.filters.viewFilter.category = (
            e.target as HTMLElement
          ).textContent
          this.view.filters.viewFilter.brands = []
          this.view.filters.viewFilter.minPrice = 0
          this.view.filters.viewFilter.maxPrice = 0
          this.view.filters.viewFilter.minRating = 0
          this.view.filters.viewFilter.maxRating = 0
          this.controller.products = data
          this.view.drawProducts(data)
          this.view.filters.updateURL()
        })
      )
    this.controller.getCategories((data: SrcItem[]) => {
      this.view.drawCategories(data)
      this.parseUrl()
    })

    filterInput?.addEventListener('input', (e: Event) => {
      const input: Nullable<HTMLInputElement> = e.target as HTMLInputElement
      const sources: SrcItem[] =
        input.value.length > 1
          ? this.filterProducts(input.value)
          : this.controller.products
      this.view.drawProducts(sources)
    })
    document
      ?.querySelector<HTMLElement>('.filter__button')
      ?.addEventListener('click', () =>
        this.view.drawCategories(this.controller.categories)
      )
    initialize()
  }

  /**
   * update
   */
  public update(e: HTMLElement) {
    this.controller.getProducts(e, (data: SrcItem[]) => {
      this.controller.products = data
      this.view.drawProducts(data)
      this.view.filters.updateURL()
    })
  }
}

export default App
