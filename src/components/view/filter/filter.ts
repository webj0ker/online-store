import './filter.css'
import {FilterParams, FilterProduct, Nullable} from '../../base/base'
import {setElement, setElementFor} from '../../base/functions'
import {SrcItem} from '../../base/base'

class Filters {
  draw(data: SrcItem[]) {
    function findBrand(nameBrand: string) {
      for (const index in filterParams.brand) {
        if (filterParams.brand[index].name === nameBrand) return true
      }
      return false
    }
    const filterParams: FilterParams = {
      brand: [],
      minPrice: 100000,
      minRating: 100000,
      maxPrice: 0,
      maxRating: 0,
    }
    // filterParams.brand = [];
    // filterParams.minPrice = 100000;
    // filterParams.minRating = 100000;
    // filterParams.maxPrice = 0;
    // filterParams.maxRating = 0;

    data.forEach((item: SrcItem) => {
      if (!findBrand(item.brand)) {
        const fp: FilterProduct = {name: item.brand, stock: item.stock}
        filterParams.brand.push(fp)
      }
      if (filterParams.minPrice > item.price) filterParams.minPrice = item.price
      if (filterParams.maxPrice < item.price) filterParams.maxPrice = item.price
      if (filterParams.minRating > item.rating)
        filterParams.minRating = item.rating
      if (filterParams.maxRating < item.rating)
        filterParams.maxRating = item.rating
    })
    const filters: SrcItem[] = data
    const fragment: DocumentFragment = document.createDocumentFragment()
    const filtersItemTemp: Nullable<HTMLTemplateElement> =
      document.querySelector<HTMLTemplateElement>('#filterItemTemp')

    filterParams.brand.forEach((item: FilterProduct) => {
      const filterClone: Nullable<HTMLTemplateElement> =
        filtersItemTemp?.content?.cloneNode(true) as HTMLTemplateElement
      setElement(
        '.filter__item-count',
        'textContent',
        item.stock.toString(),
        filterClone
      )
      filterClone
        .querySelector<HTMLElement>('checkbox')
        ?.setAttribute('filter__item-name', `filter__item-${item.name}`)
      setElementFor(
        'label',
        'htmlFor',
        `filter__item-${item.name}`,
        'textContent',
        item.name,
        filterClone
      )
      fragment.append(filterClone)
    })
    setElement('.filter-list', 'innerHTML', '')
    document.querySelector<HTMLElement>('.filter-list')?.append(fragment)
  }
}

export default Filters
