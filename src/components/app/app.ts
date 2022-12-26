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

  public start() {
    const filterInput: Nullable<HTMLInputElement> =
      document.querySelector('.filter__input')
    document
      ?.querySelector('.categories')
      ?.addEventListener('click', (e: Event) =>
        this.controller.getProducts(e, (data: SrcItem[]) =>
          this.view.drawProducts(data)
        )
      )
    this.controller.getCategories((data: SrcItem[]) =>
      this.view.drawCategories(data)
    )
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
}

export default App
