import './filter.css'
import {Nullable} from '../../base/base'
import {setElement, setElementFor} from '../../base/functions'
import {FilterItems} from '../../base/base'

class Filters {
  draw(data: FilterItems[]) {
    const filters: FilterItems[] = data
    const fragment: DocumentFragment = document.createDocumentFragment()
    const filtersItemTemp: Nullable<HTMLTemplateElement> =
      document.querySelector<HTMLTemplateElement>('#filtersItemTemp')

    filters.forEach((item: FilterItems) => {
      const filterClone: Nullable<HTMLTemplateElement> =
        filtersItemTemp?.content?.cloneNode(true) as HTMLTemplateElement
      setElement('.filter__item-count', 'textContent', '111', filterClone)
      filterClone
        .querySelector<HTMLElement>('.filter__item-checkbox')
        ?.setAttribute('filter__item-name', `filter__item-${111}`)
      setElementFor(
        '.filter__item-name',
        'htmlFor',
        `filter__item-${111}`,
        'textContent',
        'asdasda'
      )
      fragment.append(filterClone)
    })
    setElement('.filter-list', 'innerHTML', '')
    document.querySelector<HTMLElement>('.filter-list')?.append(fragment)
  }
}

export default Filters
