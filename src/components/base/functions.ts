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
