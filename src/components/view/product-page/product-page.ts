import './product-page.css'
import {SrcItem} from '../../base/base'
import {BaseComponent} from '../../base-component'

class ProductPage extends BaseComponent {
  constructor(data: SrcItem) {
    super('div', ['main'])
    this.element.innerHTML = `
        <h1>${data.brand}</h1>
    `
  }
}

export default ProductPage
