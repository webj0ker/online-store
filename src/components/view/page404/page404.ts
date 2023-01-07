import './page404.css'
import {BaseComponent} from '../../base-component'

class PageNone extends BaseComponent {
  constructor() {
    super('div', ['main'])
    this.element.innerHTML = `
        <h1>404</h1>
    `
  }
}

export default PageNone
