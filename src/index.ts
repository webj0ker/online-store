import App from './components/app/app'
import {SrcItem} from './components/base/base'
import Page404 from './components/view/page404/page404'
import ProductPage from './components/view/product-page/product-page'
import './global.css'
const app: App = new App()
export default app

window.onload = () => {
  const routing = [
    {
      name: '',
      component: () => {
        app.start()
      },
    },
    // {
    //   name: 'another_page',
    //   component: () => {
    //
    //   },
    // },
  ]

  const productRoute = {
    name: '',
    component: () => {
      function resolveGetData() {
        return new Promise((resolve) => {
          resolve(app.getData(window.location.hash.slice(1)))
        })
      }

      async function asyncCall() {
        const result = resolveGetData()
        // console.log(result)
        return result
      }

      // console.log(asyncCall())

      asyncCall()
        .then((d: SrcItem) => {
          const data: SrcItem = app.getData(window.location.hash.slice(1))
          if (data) {
            new ProductPage(data).element
          } else {
            new Page404().element
          }
        })
        .catch(() => {
          const wrapper = document.querySelector('.main .wrapper')
          wrapper.appendChild(new Page404().element)
        })
    },
  }

  const popStateHandler = () => {
    const currentRouteName = window.location.hash.slice(1)
    const currentRoute = routing.find((p) => p.name === currentRouteName)
    ;(currentRoute || productRoute)?.component()
  }

  window.onpopstate = () => {
    popStateHandler()
  }
  popStateHandler()
}
