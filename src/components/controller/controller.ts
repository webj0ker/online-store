import AppLoader from './appLoader'
import {SrcItem} from '../base/base'

class AppController extends AppLoader {
  public categories: SrcItem[] = []

  public getCategories(callback: (data: SrcItem[]) => void): void {
    super.getResp({
      callback: (data: SrcItem[]) => {
        this.categories = data
        callback(data)
      },
    })
  }

  public getProducts(e: Event, callback: (data: SrcItem[]) => void): void {
    let target: HTMLElement | null = e.target as HTMLElement
    const productsContainer: HTMLElement = e.currentTarget as HTMLElement

    while (target && target !== productsContainer) {
      if (target.classList.contains('category__item')) {
        const nameContainer: HTMLElement = target.firstChild as HTMLElement
        const categoryId: string | null =
          target.getAttribute('data-category-id')
        if (
          categoryId &&
          productsContainer.getAttribute('data-category') !== categoryId
        ) {
          productsContainer.setAttribute('data-category', categoryId)
          super.getResp({
            options: {
              sources: nameContainer.nextElementSibling
                ? nameContainer.nextElementSibling?.innerHTML
                : nameContainer.innerHTML,
            },
            callback,
          })
        }
        return
      }
      target = target.parentNode as HTMLElement
    }
  }
}

export default AppController
