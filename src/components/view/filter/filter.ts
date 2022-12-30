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
    category: '',
    brands: [],
    minPrice: 0,
    minRating: 0,
    maxPrice: 0,
    maxRating: 0,
  }
  public updateURL() {
    if (history.pushState) {
      const baseUrl =
        window.location.protocol +
        '//' +
        window.location.host +
        window.location.pathname
      const categoryUrl = `${
        this.viewFilter.category.length > 0
          ? '?category=' + this.viewFilter.category
          : ''
      }`
      const brandUrl = `${
        this.viewFilter.brands.length > 0
          ? '?brand=' + this.viewFilter.brands.join(',')
          : ''
      }`
      const priceUrl = `${
        this.viewFilter.minPrice !== 0
          ? '?price=' +
            this.viewFilter.minPrice.toFixed(2) +
            ',' +
            this.viewFilter.maxPrice.toFixed(2)
          : ''
      }`
      const ratingUrl = `${
        this.viewFilter.minRating !== 0
          ? '?rating=' +
            this.viewFilter.minRating.toFixed(2) +
            ',' +
            this.viewFilter.maxRating.toFixed(2)
          : ''
      }`
      const newUrl = baseUrl + categoryUrl + brandUrl + priceUrl + ratingUrl

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
    const filterItem = document.querySelector('.filter__item')
    if (filterItem) {
      if (
        filterItem.querySelector('input').getAttribute('data') ===
        this.viewFilter.category
      )
        return
    }
    const filterParams: FilterParams = {
      brand: [],
      minPrice: 100000,
      minRating: 100000,
      maxPrice: 0,
      maxRating: 0,
    }

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
    // const filters: SrcItem[] = data
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
      `${
        this.viewFilter.minPrice > 0
          ? this.viewFilter.minPrice.toFixed(2)
          : filterParams.minPrice.toFixed(2)
      }`,
      filterClone
    )
    setElement(
      '.to-data',
      'textContent',
      `${
        this.viewFilter.maxPrice > 0
          ? this.viewFilter.maxPrice.toFixed(2)
          : filterParams.maxPrice.toFixed(2)
      }`,
      filterClone
    )
    const kPrice = 100 / filterParams.maxPrice
    const slidersPrice = filterClone.querySelectorAll<HTMLElement>('input')
    slidersPrice.forEach((value: HTMLElement) => {
      if (value.className === 'range-left-point')
        (value as HTMLInputElement).value = `${
          (this.viewFilter.minPrice > 0
            ? this.viewFilter.minPrice
            : filterParams.minPrice) * kPrice
        }`
      else
        (value as HTMLInputElement).value = `${
          (this.viewFilter.maxPrice > 0
            ? this.viewFilter.maxPrice
            : filterParams.maxPrice) * kPrice
        }`
      value.setAttribute('data', `${this.viewFilter.category}`)
    })

    filterClone
      .querySelector<HTMLElement>('input')
      .addEventListener('input', (ev: Event) => {
        const divParent = (ev.target as HTMLElement).parentElement.parentElement
        const fromData = divParent.querySelector('.from-data')
        const toData = divParent.querySelector('.to-data')
        const kPrice = 100 / filterParams.maxPrice
        if ((ev.target as HTMLElement).className === 'range-left-point')
          fromData.textContent = (
            Number((ev.target as HTMLInputElement).value) / kPrice
          ).toFixed(2)
        else
          toData.textContent = (
            Number((ev.target as HTMLInputElement).value) / kPrice
          ).toFixed(2)
        this.viewFilter.minPrice =
          Number((ev.target as HTMLInputElement).value) / kPrice
        this.updateURL()
        const findCategory = (ev.target as HTMLInputElement).getAttribute(
          'data'
        )
        const listCategory =
          document.querySelectorAll<HTMLElement>('.category__item')
        listCategory.forEach((category: HTMLElement) => {
          if (category.textContent === findCategory) {
            app.update(category)
            return
          }
        })
      })

    filterClone
      .querySelector<HTMLElement>('.range-right-point')
      .addEventListener('input', (ev: Event) => {
        const divParent = (ev.target as HTMLElement).parentElement.parentElement
        const fromData = divParent.querySelector('.from-data')
        const toData = divParent.querySelector('.to-data')
        const kPrice = 100 / filterParams.maxPrice
        if ((ev.target as HTMLElement).className === 'range-left-point')
          fromData.textContent = (
            Number((ev.target as HTMLInputElement).value) / kPrice
          ).toFixed(2)
        else
          toData.textContent = (
            Number((ev.target as HTMLInputElement).value) / kPrice
          ).toFixed(2)
        this.viewFilter.maxPrice =
          Number((ev.target as HTMLInputElement).value) / kPrice
        this.updateURL()
        const findCategory = (ev.target as HTMLInputElement).getAttribute(
          'data'
        )
        const listCategory =
          document.querySelectorAll<HTMLElement>('.category__item')
        listCategory.forEach((category: HTMLElement) => {
          if (category.textContent === findCategory) {
            app.update(category)
            return
          }
        })
      })

    fragment.append(filterClone)

    const filterClone2: Nullable<HTMLTemplateElement> =
      filtersSliderItemTemp?.content?.cloneNode(true) as HTMLTemplateElement
    setElement('.filter__range-caption', 'textContent', 'Rating', filterClone2)
    setElement(
      '.from-data',
      'textContent',
      `${
        this.viewFilter.minRating > 0
          ? this.viewFilter.minRating.toFixed(2)
          : filterParams.minRating.toFixed(2)
      }`,
      filterClone2
    )
    setElement(
      '.to-data',
      'textContent',
      `${
        this.viewFilter.maxRating > 0
          ? this.viewFilter.maxRating.toFixed(2)
          : filterParams.maxRating.toFixed(2)
      }`,
      filterClone2
    )

    const slidersRating = filterClone2.querySelectorAll<HTMLElement>('input')
    slidersRating.forEach((value: HTMLElement) => {
      if (value.className === 'range-left-point')
        (value as HTMLInputElement).value = `${
          (this.viewFilter.minRating > 0
            ? this.viewFilter.minRating
            : filterParams.minRating) * 20
        }`
      else
        (value as HTMLInputElement).value = `${
          (this.viewFilter.maxRating > 0
            ? this.viewFilter.maxRating
            : filterParams.maxRating) * 20
        }`
      value.setAttribute('data', `${this.viewFilter.category}`)
    })

    filterClone2
      .querySelector<HTMLElement>('input')
      .addEventListener('input', (ev: Event) => {
        const divParent = (ev.target as HTMLElement).parentElement.parentElement
        const fromData = divParent.querySelector('.from-data')
        const toData = divParent.querySelector('.to-data')
        const kRating = 100 / 5
        if ((ev.target as HTMLElement).className === 'range-left-point')
          fromData.textContent = (
            Number((ev.target as HTMLInputElement).value) / kRating
          ).toFixed(2)
        else
          toData.textContent = (
            Number((ev.target as HTMLInputElement).value) / kRating
          ).toFixed(2)
        this.viewFilter.minRating =
          Number((ev.target as HTMLInputElement).value) / kRating
        this.updateURL()
        const findCategory = (ev.target as HTMLInputElement).getAttribute(
          'data'
        )
        const listCategory =
          document.querySelectorAll<HTMLElement>('.category__item')
        listCategory.forEach((category: HTMLElement) => {
          if (category.textContent === findCategory) {
            app.update(category)
            return
          }
        })
      })

    filterClone2
      .querySelector<HTMLElement>('.range-right-point')
      .addEventListener('input', (ev: Event) => {
        const divParent = (ev.target as HTMLElement).parentElement.parentElement
        const fromData = divParent.querySelector('.from-data')
        const toData = divParent.querySelector('.to-data')
        const kRating = 100 / 5
        if ((ev.target as HTMLElement).className === 'range-left-point')
          fromData.textContent = (
            Number((ev.target as HTMLInputElement).value) / kRating
          ).toFixed(2)
        else
          toData.textContent = (
            Number((ev.target as HTMLInputElement).value) / kRating
          ).toFixed(2)
        this.viewFilter.maxRating =
          Number((ev.target as HTMLInputElement).value) / kRating
        this.updateURL()
        const findCategory = (ev.target as HTMLInputElement).getAttribute(
          'data'
        )
        const listCategory =
          document.querySelectorAll<HTMLElement>('.category__item')
        listCategory.forEach((category: HTMLElement) => {
          if (category.textContent === findCategory) {
            app.update(category)
            return
          }
        })
      })

    fragment.append(filterClone2)
    setElement('.filter-list-range', 'innerHTML', '')
    document.querySelector<HTMLElement>('.filter-list-range')?.append(fragment)
  }
}

export default Filters
