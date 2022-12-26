// export async function getResponse(): Promise<Array<ProductItem> | string> {
// export function getResponse(): ProductItem[] {

//   const data = fetch('assets/data/products.json')
// .then(res => res.json())
// .then(json => {
//     const arr: Array<ProductItem> = json.products
//     return arr
// })
// return data
// }

// export async function getResponse(): Promise<string | Array<ProductItem>> {

//    try {
//         const data = await fetch('assets/data/products.json')
//         const content = await data.json()
//         return content.products
//     } catch (error) {
//         if (error) {
//             return error.message
//         }
//     }

// }

export async function getResponse(): Promise<Array<ProductItem> | string> {
  const data = await fetch('assets/data/products.json')
  const content = await data.json()
  const product = content.products
  // if(product.isArray()){
  //     return product;
  // }
  return product
}

// class Loader {
//     baseLink: string;
//     // options: ProductItem;
//     constructor(baseLink: string) {
//       this.baseLink = baseLink;
//     }

//     getResp<T>(

//         { endpoint, options = {} }: QueryOptionsInterface,
//         callback: CallbackType<T> = () => {
//           console.error('No callback for GET response');
//         }
//       ): void {
//         this.load<T>('GET', endpoint, callback, options);

//       }

//       errorHandler(res: Response): Response {
//         if (!res.ok) {
//           if (res.status === 401 || res.status === 404)
//             console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
//           throw Error(res.statusText);
//         }

//         return res;
//       }

//       load<T>(method: string, endpoint: string, callback: CallbackType<T>, options = {}): void {
//         fetch(this.baseLink)
//           .then(this.errorHandler)
//           .then((res: Response) => res.json() as Promise<T>)
//           .then((data) => callback(data))
//           .catch((err) => console.error(err));
//       }
// }

// export default Loader;
