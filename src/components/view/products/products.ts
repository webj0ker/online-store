import './products.css'
import {SrcItem, Nullable} from '../../base/base'
import {setElement} from '../../base/functions'

class Products {
  draw(data: SrcItem[]) {
    const products: SrcItem[] = data
    const fragment: DocumentFragment = document.createDocumentFragment()
    const productsItemTemp: Nullable<HTMLTemplateElement> =
      document.querySelector<HTMLTemplateElement>('#productsItemTemp')

    products.forEach((item: SrcItem, index: number) => {
      const productsClone: Nullable<HTMLTemplateElement> =
        productsItemTemp?.content?.cloneNode(true) as HTMLTemplateElement
      const productsMetaPhoto: Nullable<HTMLElement> =
        productsClone.querySelector<HTMLElement>('.products__meta-photo')
      if (index % 2) {
        productsClone
          .querySelector<HTMLElement>('.products__item')
          ?.classList.add('alt')
      }
      if (productsMetaPhoto) {
        productsMetaPhoto.style.backgroundImage = `url(${
          item.images[0] || 'img/products_placeholder.jpg'
        })`
      }
      setElement(
        '.products__meta-brand',
        'textContent',
        item.brand || item.title,
        productsClone
      )
      setElement(
        '.products__meta-date',
        'textContent',
        item.discountPercentage,
        productsClone
      )
      setElement(
        '.products__description-title',
        'textContent',
        item.title,
        productsClone
      )
      setElement(
        '.products__description-price',
        'textContent',
        item.price.toString(),
        productsClone
      )
      setElement(
        '.products__description-rating',
        'textContent',
        item.rating.toString(),
        productsClone
      )
      setElement(
        '.products__description-content',
        'textContent',
        item.description,
        productsClone
      )
      productsClone
        .querySelector<HTMLElement>('.products__read-more a')
        ?.setAttribute('href', item.images[0])
      fragment.append(productsClone)
    })
    setElement('.products', 'innerHTML', '')
    document.querySelector<HTMLElement>('.products')?.appendChild(fragment)
  }
}

export default Products
