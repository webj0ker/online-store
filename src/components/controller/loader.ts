import {Config, SrcItem, RespItem, Options} from '../base/base'

class Loader {
  public baseLink: string

  constructor(baseLink: string) {
    this.baseLink = baseLink
  }

  public getResp(config: Config<SrcItem>): void {
    this.load(config)
  }

  private static errorHandler(res: Response): Response {
    if (!res.ok) {
      if (res.status === 401 || res.status === 404)
        console.log(
          `Sorry, but there is ${res.status} error: ${res.statusText}`
        )
      throw Error(res.statusText)
    }

    return res
  }

  private itemCheck(arr: string[], item: SrcItem, options?: Options) {
    if (options && options.sources === item.category) {
      arr.push(item.category)
      return true
    } else if (
      options &&
      !options.sources &&
      arr.indexOf(item.category) === -1
    ) {
      arr.push(item.category)
      return true
    }
    return false
  }
  private load({callback, options = {}}: Config<SrcItem>) {
    fetch('../../src/assets/products.json')
      .then((res: Response) => Loader.errorHandler(res))
      .then((res: Response) => res.json())
      .then((data: RespItem) => {
        if (!callback) {
          return
        }
        const tmpArray: string[] = []
        //data.products = this.sources;
        callback(
          data.products.filter((item) =>
            this.itemCheck(tmpArray, item, options)
          )
        )
      })
      .catch((err: Error) => console.error(err))
  }
}

export default Loader
