import app from '../../../index'
import {Nullable, SrcItem} from '../../base/base'
import {setElement} from '../../base/functions'
import '../modal/modal.css'
import initialize from '../slider/slider'

function viewModal() {
  const listProductsA = document.querySelectorAll('[href="#openModal"]')
  listProductsA.forEach((value: Element) => {
    value.addEventListener('click', function (e) {
      const scrollbar = document.body.clientWidth - window.innerWidth + 'px'
      document.body.style.overflow = 'hidden'
      document.querySelector<HTMLElement>('#openModal').style.marginLeft =
        scrollbar
      const fragment: DocumentFragment = document.createDocumentFragment()
      const productTemp: Nullable<HTMLTemplateElement> =
        document.querySelector<HTMLTemplateElement>('#productTemp')
      const productsClone: Nullable<HTMLTemplateElement> =
        productTemp?.content?.cloneNode(true) as HTMLTemplateElement
      const productsPhoto: Nullable<HTMLElement> =
        productsClone.querySelector<HTMLElement>('.slider .images')
      const btnPhoto: Nullable<HTMLElement> =
        productsClone.querySelector<HTMLElement>('.slider .btm-slides')
      const readMoreProductId = parseInt((e.target as HTMLElement).id)
      const products: SrcItem[] = app.products
      for (let index = 0; index < products.length; index++) {
        const item = products[index]
        if (readMoreProductId === parseInt(item.id)) {
          for (let i = 0; i < item.images.length; i++) {
            const element = item.images[i]
            const tagImg = document.createElement('img') as HTMLImageElement
            tagImg.src = element
            productsPhoto.appendChild(tagImg)
            const tagSpan = document.createElement('span') as HTMLSpanElement
            tagSpan.id = (i + 1).toString()
            btnPhoto.appendChild(tagSpan)
          }
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
          fragment.append(productsClone)
          setElement('.modal-body', 'innerHTML', '')
          document
            .querySelector<HTMLElement>('.modal-body')
            ?.appendChild(fragment)
          initialize()
          return
        }
      }
    })
  })
  const btnClose = document.querySelector('[href="#close"]')
  btnClose.addEventListener('click', function () {
    document.body.style.overflow = 'visible'
    document.querySelector<HTMLElement>('#openModal').style.marginLeft = '0px'
  })
}

export default viewModal
