import './categories.css'
import {Nullable, SrcItem} from '../../base/base'
import {setElement} from '../../base/functions'

class Categories {
  public draw(data: SrcItem[]) {
    const fragment: DocumentFragment = document.createDocumentFragment()
    const categoryItemTemp: Nullable<HTMLTemplateElement> =
      document.querySelector<HTMLTemplateElement>('#categoryItemTemp')

    data.forEach((item: SrcItem) => {
      const categoryClone: Nullable<HTMLTemplateElement> =
        categoryItemTemp?.content?.cloneNode(true) as HTMLTemplateElement
      setElement(
        '.category__item-name',
        'textContent',
        item.category,
        categoryClone
      )
      categoryClone
        .querySelector<HTMLElement>('.category__item')
        ?.setAttribute('data-category-id', item.id)
      fragment.append(categoryClone)
    })
    setElement('.categories__wrapper', 'innerHTML', '')
    document
      .querySelector<HTMLElement>('.categories__wrapper')
      ?.append(fragment)
  }
}

export default Categories
