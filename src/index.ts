import './style.scss'
// import { getResponse } from "./components/model/getResponse";
import {products} from './components/model/data/products'
import {Card} from './components/Card/Card'

const root = document.getElementById('root')
// const item =  getResponse();
// console.log(getResponse())

// const card = new Card()
// const arr = getResponse()

// for(let i=0; i < item.length; i++) {

// }

products.forEach((elem: ProductItem) => {
  // this.garage = new Garage();
  root.appendChild(new Card(elem).element)
})
