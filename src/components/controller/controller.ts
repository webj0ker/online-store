import AppLoader from './appLoader'
import {SrcItem} from '../base/base'

class AppController extends AppLoader {
  public categories: SrcItem[] = []
  public products: SrcItem[] = []
  public cartProducts: SrcItem[] = []
  public getCategories(callback: (data: SrcItem[]) => void): void {
    super.getResp({
      callback: (data: SrcItem[]) => {
        this.categories = data
        callback(data)
      },
    })
  }

  public getProducts(
    e: Event | HTMLElement,
    callback: (data: SrcItem[]) => void
  ): void {
    let target: HTMLElement | null =
      e instanceof Event ? (e.target as HTMLElement) : e
    const productsContainer: HTMLElement =
      e instanceof Event ? (e.currentTarget as HTMLElement) : e.parentElement

    while (target && target !== productsContainer) {
      if (target.classList.contains('category__item')) {
        const nameContainer: HTMLElement = target.firstChild as HTMLElement
        const categoryId: string | null =
          target.getAttribute('data-category-id')
        //if (
        //  categoryId &&
        //  productsContainer.getAttribute('data-category') !== categoryId
        //) {
        productsContainer.setAttribute('data-category', categoryId)
        super.getResp({
          options: {
            sources: nameContainer.nextElementSibling
              ? nameContainer.nextElementSibling?.innerHTML
              : nameContainer.innerHTML,
          },
          callback,
        })
        //}
        return
      }
      target = target.parentNode as HTMLElement
    }
  }
}

export default AppController
