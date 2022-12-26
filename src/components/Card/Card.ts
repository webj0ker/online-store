import {BaseComponent} from '../../components/BaseComponent'
import './card.scss'

export class Card extends BaseComponent {
  constructor(product: ProductItem) {
    super('div', ['card'])

    this.element.innerHTML = `
      <div class="card-wrapper" data-id="${product.id}" style="background-image: url('${product.thumbnail}')" width="200px" height="200px">
       <div class="card-title">${product.title}</div>
       <div class="card-info">
        <p><span>Category:</span> ${product.category}</p>
        <p><span>Brand: </span> ${product.brand}</p>
        <p><span>Price:</span> €${product.price}</p>
        <p><span>Discount:</span> ${product.discountPercentage}%</p>
        <p><span>Rating:</span> ${product.rating}</p>
        <p><span>Stock:</span> ${product.stock}</p>
       </div>
       <div class="card-buttons">
        <button>ADD TO CART</button>
        <button>DETAILS</button>
       </div>
      </div>
    `
  }
}
