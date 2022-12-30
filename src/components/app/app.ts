import AppController from '../controller/controller'
import {AppView} from '../view/appView'
import {Nullable, SrcItem} from '../base/base'

class App {
  public controller: AppController
  public view: AppView

  constructor() {
    this.controller = new AppController()
    this.view = new AppView()
  }

  public filterCategories(value: string): SrcItem[] {
    return this.controller.categories.filter((item: SrcItem) =>
      item.category.toLowerCase().includes(value.toLowerCase())
    )
  }

  private parseUrl() {
    function getCurrentURL() {
      return window.location.href
    }
    const url = getCurrentURL()
    const filterUrl = url.split('?')
    filterUrl.forEach((value: string) => console.log(value))
    this.view.filters.viewFilter.category = filterUrl[1]
      ? filterUrl[1]?.slice(9)
      : ''
    this.view.filters.viewFilter.brands = filterUrl[2]
      ? filterUrl[2]?.slice(6).split(',')
      : []
    this.view.filters.viewFilter.minPrice = filterUrl[3]
      ? Number(filterUrl[3]?.slice(6).split(',')[0])
      : 0
    this.view.filters.viewFilter.maxPrice = filterUrl[3]
      ? Number(filterUrl[3]?.slice(6).split(',')[1])
      : 0
    this.view.filters.viewFilter.minRating = filterUrl[4]
      ? Number(filterUrl[4]?.slice(7).split(',')[0])
      : 0
    this.view.filters.viewFilter.maxRating = filterUrl[4]
      ? Number(filterUrl[4]?.slice(7).split(',')[1])
      : 0

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
          ? this.filterCategories(input.value)
          : this.controller.categories
      this.view.drawCategories(sources)
    })
    document
      ?.querySelector<HTMLElement>('.filter__button')
      ?.addEventListener('click', () =>
        this.view.drawCategories(this.controller.categories)
      )
  }

  /**
   * update
   */
  public update(e: HTMLElement) {
    this.controller.getProducts(e, (data: SrcItem[]) =>
      this.view.drawProducts(data)
    )
  }
}

export default App
