import './filter.css'
import {
  FilterParams,
  FilterProduct,
  Nullable,
  ViewFilter,
} from '../../base/base'
import {setElement, setElementFor} from '../../base/functions'
import app from '../../../index'
import {SrcItem} from '../../base/base'

class Filters {
  public viewFilter: ViewFilter = {
    brands: [],
    minPrice: 0,
    minRating: 0,
    maxPrice: 0,
    maxRating: 0,
  }
  private updateURL() {
    if (history.pushState) {
      const baseUrl =
        window.location.protocol +
        '//' +
        window.location.host +
        window.location.pathname
      const newUrl =
        baseUrl +
        `${
          this.viewFilter.brands.length > 0
            ? '?brand=' + this.viewFilter.brands.join(',')
            : ''
        }`
      history.pushState(null, null, newUrl)
    } else {
      console.warn('History API не поддерживается')
    }
  }
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
        const fp: FilterProduct = {
          category: item.category,
          name: item.brand,
          stock: item.stock,
        }
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
    const filtersSliderItemTemp: Nullable<HTMLTemplateElement> =
      document.querySelector<HTMLTemplateElement>('#filterSliderItemTemp')

    filterParams.brand.forEach((item: FilterProduct) => {
      const filterClone: Nullable<HTMLTemplateElement> =
        filtersItemTemp?.content?.cloneNode(true) as HTMLTemplateElement
      setElement(
        '.filter__item-count',
        'textContent',
        item.stock.toString(),
        filterClone
      )
      if (this.viewFilter.brands.includes(item.name))
        (
          filterClone.querySelector<HTMLElement>('input') as HTMLInputElement
        ).checked = true
      filterClone
        .querySelector<HTMLElement>('input')
        ?.setAttribute('id', `filter__item-${item.name}`)
      filterClone
        .querySelector<HTMLElement>('input')
        ?.setAttribute('data', `${item.category}`)
      filterClone
        .querySelector<HTMLElement>('input')
        .addEventListener('click', (ev: MouseEvent) => {
          const input: Nullable<HTMLInputElement> =
            ev.target as HTMLInputElement
          if (input.checked)
            this.viewFilter.brands.push(input.getAttribute('id').slice(13))
          else {
            const index = this.viewFilter.brands.indexOf(
              input.getAttribute('id').slice(13)
            )
            this.viewFilter.brands.splice(index, 1)
          }
          const findCategory = input.getAttribute('data')
          const listCategory =
            document.querySelectorAll<HTMLElement>('.category__item')
          listCategory.forEach((category: HTMLElement) => {
            if (category.textContent === findCategory) {
              app.update(category)
              this.updateURL()
              return
            }
          })
        })
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
    setElement('.filter-list-brand', 'innerHTML', '')
    document.querySelector<HTMLElement>('.filter-list-brand')?.append(fragment)

    const filterClone: Nullable<HTMLTemplateElement> =
      filtersSliderItemTemp?.content?.cloneNode(true) as HTMLTemplateElement
    setElement('.filter__range-caption', 'textContent', 'Price', filterClone)
    setElement(
      '.from-data',
      'textContent',
      `${filterParams.minPrice}`,
      filterClone
    )
    setElement(
      '.to-data',
      'textContent',
      `${filterParams.maxPrice}`,
      filterClone
    )
    fragment.append(filterClone)

    const filterClone2: Nullable<HTMLTemplateElement> =
      filtersSliderItemTemp?.content?.cloneNode(true) as HTMLTemplateElement
    setElement('.filter__range-caption', 'textContent', 'Rating', filterClone2)
    setElement(
      '.from-data',
      'textContent',
      `${filterParams.minRating}`,
      filterClone2
    )
    setElement(
      '.to-data',
      'textContent',
      `${filterParams.maxRating}`,
      filterClone2
    )
    fragment.append(filterClone2)
    setElement('.filter-list-range', 'innerHTML', '')
    document.querySelector<HTMLElement>('.filter-list-range')?.append(fragment)
  }
}

export default Filters
