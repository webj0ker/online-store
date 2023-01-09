import './products.css'
import '../cart/cart.css'
import '../order/order.css'

import {SrcItem, Nullable} from '../../base/base'
import {setElement} from '../../base/functions'
import app from '../../..'

class Products {
  draw(data: SrcItem[]) {
    const fragment: DocumentFragment = document.createDocumentFragment()
    const productsItemTemp: Nullable<HTMLTemplateElement> =
      document.querySelector<HTMLTemplateElement>('#productsItemTemp')

    data.forEach((item: SrcItem, index: number) => {
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
        ?.setAttribute('id', item.id)
      productsClone
        .querySelector<HTMLElement>('.product__buttons .btn_cart')
        ?.setAttribute('id', item.id)
      productsClone
        .querySelector<HTMLElement>('.product__buttons .btn_cart')
        .addEventListener('click', (e) => {
          const btn_cart = e.target as HTMLElement
          const productId = parseInt((e.target as HTMLElement).id)
          const products = app.products
          for (let index = 0; index < products.length; index++) {
            const element = products[index]
            if (parseInt(element.id) === productId) {
              app.addProduct = element
              const countSpan =
                document.querySelector<HTMLElement>('.icon .count')
              const countIntoCart = countSpan.innerText
              countSpan.innerText = `${parseInt(countIntoCart) + 1}`
              btn_cart.classList.toggle('active')
              return
            }
          }
        })
      fragment.append(productsClone)
    })
    setElement('.products', 'innerHTML', '')
    document.querySelector<HTMLElement>('.products')?.appendChild(fragment)
  }
}

export default Products
