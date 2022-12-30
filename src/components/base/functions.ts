import {Nullable} from './base'

export function setElement(
  selector: string,
  param: 'innerHTML' | 'textContent',
  value: string,
  parent: HTMLElement = document.body
): void {
  const element: Nullable<HTMLElement> =
    parent.querySelector<HTMLElement>(selector)

  if (element) {
    element[param] = value
  }
}

export function setElementFor(
  selector: string,
  param: 'htmlFor',
  value: string,
  content: 'innerHTML' | 'textContent',
  text: string,
  parent: HTMLElement = document.body
): void {
  const element: Nullable<HTMLLabelElement> = <HTMLLabelElement>(
    parent.querySelector<HTMLElement>(selector)
  )

  if (element) {
    element.className = value
    element[param] = value
    element[content] = text
  }
}
