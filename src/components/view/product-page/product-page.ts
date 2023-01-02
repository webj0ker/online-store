import './product-page.css'
import {SrcItem} from '../../base/base'
import {BaseComponent} from '../../base-component'

export class ProductPage extends BaseComponent {
  constructor(readonly data: SrcItem, url: string) {
    super('div', ['wrapper'])
    this.element.innerHTML = `
        <h1>${data.title}</h1>
    `
  }
}
