import app from '../../..'
import {setElement} from '../../base/functions'
import {Nullable, SrcItem} from '../../base/base'
import initialize from '../order/order'

function cart_initialize() {
  const btn_cart = document.querySelector<HTMLElement>('.cart-contents')
  btn_cart.addEventListener('click', (e) => {
    const fragment: DocumentFragment = document.createDocumentFragment()
    const cartItemTemp: Nullable<HTMLTemplateElement> =
      document.querySelector<HTMLTemplateElement>('#cartItem')
    let totalPrice = 0
    const products = app.cartProducts
    products.forEach((value: SrcItem) => {
      const productsClone: Nullable<HTMLTemplateElement> =
        cartItemTemp?.content?.cloneNode(true) as HTMLTemplateElement
      const productsMetaPhoto: Nullable<HTMLElement> =
        productsClone.querySelector<HTMLElement>('.products__meta-photo')
      productsMetaPhoto.style.backgroundImage = `url(${value.images[0]})`
      setElement('.title', 'textContent', value.title, productsClone)
      setElement('.price', 'textContent', value.price.toString(), productsClone)
      totalPrice += value.price
      productsClone.querySelector<HTMLElement>('.item-amount-btn-minus').id =
        value.id
      productsClone.querySelector<HTMLElement>('.item-amount-btn-plus').id =
        value.id
      productsClone
        .querySelector<HTMLElement>('.item-amount-btn-minus')
        .addEventListener('click', (e) => {
          const productId = parseInt((e.target as HTMLElement).id)
          const products = app.products
          for (let index = 0; index < products.length; index++) {
            const element = products[index]
            if (parseInt(element.id) === productId) {
              const countSpan =
                document.querySelector<HTMLElement>('.icon .count')
              const countEdit = (
                e.target as HTMLElement
              ).parentElement.querySelector<HTMLInputElement>(
                '.item-amount-filed'
              )
              const countIntoCart = countSpan.innerText
              countSpan.innerText = `${parseInt(countIntoCart) - 1}`
              countEdit.value = `${parseInt(countEdit.value) - 1}`
              app.delProduct = element
              const currentSum = (
                e.target as HTMLElement
              ).parentElement.parentElement.querySelector<HTMLSpanElement>(
                '.price'
              )
              currentSum.innerText = `${
                parseInt(countEdit.value) * element.price
              }`
              const totalSum = document.querySelector<HTMLSpanElement>(
                '.coupon-block-total-price-current'
              )
              totalSum.innerText = `${
                parseInt(totalSum.innerText) - element.price
              }`
              return
            }
          }
        })

      productsClone
        .querySelector<HTMLElement>('.item-amount-btn-plus')
        .addEventListener('click', (e) => {
          const productId = parseInt((e.target as HTMLElement).id)
          const products = app.products
          for (let index = 0; index < products.length; index++) {
            const element = products[index]
            if (parseInt(element.id) === productId) {
              const countSpan =
                document.querySelector<HTMLElement>('.icon .count')
              const countEdit = (
                e.target as HTMLElement
              ).parentElement.querySelector<HTMLInputElement>(
                '.item-amount-filed'
              )
              const countIntoCart = countSpan.innerText
              countEdit.value = `${parseInt(countEdit.value) + 1}`
              countSpan.innerText = `${parseInt(countIntoCart) + 1}`
              app.addProduct = element
              const currentSum = (
                e.target as HTMLElement
              ).parentElement.parentElement.querySelector<HTMLSpanElement>(
                '.price'
              )
              currentSum.innerText = `${
                parseInt(countEdit.value) * element.price
              }`
              const totalSum = document.querySelector<HTMLSpanElement>(
                '.coupon-block-total-price-current'
              )
              totalSum.innerText = `${
                parseInt(totalSum.innerText) + element.price
              }`
              return
            }
          }
        })

      fragment.append(productsClone)
    })
    setElement('.cart', 'innerHTML', '')
    document.querySelector<HTMLElement>('.cart')?.appendChild(fragment)
    document
      .querySelector<HTMLElement>('.products')
      ?.style.setProperty('display', 'none')
    document
      .querySelector<HTMLElement>('.cart-container')
      ?.style.setProperty('display', 'flex')
    const totalPriceDiv = document.querySelector<HTMLElement>(
      '.coupon-block-total-price-current'
    )
    totalPriceDiv.textContent = totalPrice.toString()
  })

  const btnCheckout = document.querySelector('.btn-checkout')
  btnCheckout.addEventListener('click', (e) => {
    document
      .querySelector<HTMLElement>('.products')
      ?.style.setProperty('display', 'none')
    document
      .querySelector<HTMLElement>('.cart-container')
      ?.style.setProperty('display', 'none')

    const scrollbar = document.body.clientWidth - window.innerWidth + 'px'
    document.body.style.overflow = 'hidden'
    document.querySelector<HTMLElement>('#openModal').style.marginLeft =
      scrollbar
    const fragment: DocumentFragment = document.createDocumentFragment()
    const orderTemp: Nullable<HTMLTemplateElement> =
      document.querySelector<HTMLTemplateElement>('.order')
    const orderClone: Nullable<HTMLTemplateElement> =
      orderTemp?.content?.cloneNode(true) as HTMLTemplateElement
    fragment.append(orderClone)
    setElement('.modal-body', 'innerHTML', '')
    document.querySelector<HTMLElement>('.modal-body')?.appendChild(fragment)
    document
      .querySelector<HTMLElement>('.order')
      ?.style.setProperty('display', 'flex')
    initialize()
    document.querySelector<HTMLElement>('.modal').classList.toggle('active')
    const btnClose = document.querySelector('[href="#close"]')
    btnClose.addEventListener('click', function () {
      document.body.style.overflow = 'visible'
      document.querySelector<HTMLElement>('#openModal').style.marginLeft = '0px'
      document.querySelector<HTMLElement>('.modal').classList.toggle('active')
    })
  })
}

export default cart_initialize
