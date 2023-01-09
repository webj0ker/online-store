/*
<svg-icon src="assets/x.svg" class="clear">
  <svg xmlns="http://www.w3.org/2000/svg" 
    width="24" height="24" viewBox="0 0 24 24" 
    fill="none" stroke="currentColor" 
    stroke-width="2" stroke-linecap="round" 
    stroke-linejoin="round" class="feather feather-x">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
</svg-icon>

<svg-icon src="assets/check.svg"
  class="success">
  <svg xmlns="http://www.w3.org/2000/svg"
    width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
    class="feather feather-check">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
</svg-icon>

<svg-icon src="/assets/alert-icon.svg" 
  class="alert-icon ">
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
    class="feather feather-alert-circle">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="8" x2="12" y2="12"></line>
    <line x1="12" y1="16" x2="12.01" y2="16"></line>
  </svg>
</svg-icon>
*/

import {checkCreditCard} from './checkCard'

function initialize() {
  const username = document.querySelector(
    '.input-user-name'
  ) as HTMLInputElement
  const address = document.querySelector('.address-input') as HTMLInputElement
  const email = document.querySelector('.input-user-email') as HTMLInputElement
  const phone = document.querySelector('.input-tel') as HTMLInputElement

  const ccNumber = document.getElementById('cc-number') as HTMLInputElement
  const ccExp = document.getElementById('cc-exp') as HTMLInputElement
  const ccCsc = document.getElementById('cc-csc') as HTMLInputElement
  const ccName = document.getElementById('cc-name') as HTMLInputElement
  const form = document.getElementById('form')
  form.addEventListener('submit', (e) => {
    e.preventDefault()

    checkInputs()
  })

  ccNumber.addEventListener('input', (e) => {
    const ccNumber = e.target as HTMLInputElement
    if (
      ccNumber.value.length === 4 ||
      ccNumber.value.length === 9 ||
      ccNumber.value.length === 14
    )
      ccNumber.value += ' '
    const objValidCard = checkCreditCard(ccNumber.value)
    if (objValidCard.success)
      ccNumber.maxLength = Math.max(
        ...objValidCard.maxLength
          .split(',')
          .map((value: string) => parseInt(value))
      )
  })

  ccNumber.addEventListener('focusout', (e) => {
    const ccNumberValue = (e.target as HTMLInputElement).value
    const values = ccNumberValue.split(' ')
    if (values.length === 4) setSuccessFor(e.target as HTMLInputElement)
    else setErrorFor(e.target as HTMLInputElement)
  })

  ccExp.addEventListener('input', (e) => {
    if (
      (e.target as HTMLInputElement).value.length === 2 &&
      (e.target as HTMLInputElement).value.indexOf('/') === -1
    )
      (e.target as HTMLInputElement).value += ' / '
  })

  ccExp.addEventListener('focusout', (e) => {
    const ccExpValue = (e.target as HTMLInputElement).value
    const values = ccExpValue.split(' / ')
    if (values.length === 2) {
      if (parseInt(values[0]) < 12 && parseInt(values[1]) <= 31)
        setSuccessFor(e.target as HTMLInputElement)
      else setErrorFor(e.target as HTMLInputElement)
    } else setErrorFor(e.target as HTMLInputElement)
  })

  ccCsc.addEventListener('focusout', (e) => {
    const ccCscValue = (e.target as HTMLInputElement).value
    if (ccCscValue.length === 3) setSuccessFor(e.target as HTMLInputElement)
    else setErrorFor(e.target as HTMLInputElement)
  })

  ccName.addEventListener('focusout', (e) => {
    const ccNameValue = (e.target as HTMLInputElement).value.trim()
    if (ccNameValue.length >= 3) setSuccessFor(e.target as HTMLInputElement)
    else setErrorFor(e.target as HTMLInputElement)
  })

  phone.addEventListener('focusin', (e) => {
    if ((e.target as HTMLInputElement).value.length === 0)
      (e.target as HTMLInputElement).value = '+375 ('
  })

  phone.addEventListener('input', (e) => {
    if (
      (e.target as HTMLInputElement).value.length === 8 &&
      (e.target as HTMLInputElement).value.indexOf(')') === -1
    )
      (e.target as HTMLInputElement).value += ') '
  })

  phone.addEventListener('focusout', (e) => {
    const phoneValue = (e.target as HTMLInputElement).value
    if (phoneValue.length === 17) setSuccessFor(e.target as HTMLInputElement)
    else setErrorFor(e.target as HTMLInputElement)
  })

  username.addEventListener('focusout', (e) => {
    const usernameValue = (e.target as HTMLInputElement).value.trim()
    if (usernameValue.split(' ').length === 2)
      setSuccessFor(e.target as HTMLInputElement)
    else setErrorFor(e.target as HTMLInputElement)
  })

  email.addEventListener('focusout', (e) => {
    const emailValue = (e.target as HTMLInputElement).value.trim()
    if (isEmail(emailValue)) setSuccessFor(e.target as HTMLInputElement)
    else setErrorFor(e.target as HTMLInputElement)
  })

  address.addEventListener('focusout', (e) => {
    const addressValue = (e.target as HTMLInputElement).value.trim()
    if (
      addressValue.split(/ |,/).filter((value: string) => value.length >= 5)
        .length === 3
    )
      setSuccessFor(e.target as HTMLInputElement)
    else setErrorFor(e.target as HTMLInputElement)
  })
}

function checkInputs() {
  const username = document.querySelector(
    '.input-user-name'
  ) as HTMLInputElement
  const address = document.querySelector('.address-input') as HTMLInputElement
  const email = document.querySelector('.input-user-email') as HTMLInputElement
  const phone = document.querySelector('.input-tel') as HTMLInputElement

  const ccNumber = document.getElementById('cc-number') as HTMLInputElement
  const ccExp = document.getElementById('cc-exp') as HTMLInputElement
  const ccCsc = document.getElementById('cc-csc') as HTMLInputElement
  const ccName = document.getElementById('cc-name') as HTMLInputElement

  // trim to remove the whitespaces
  const usernameValue = username.value.trim()
  const emailValue = email.value.trim()

  if (usernameValue.split(' ').length === 2) setSuccessFor(username)
  else setErrorFor(username)

  if (isEmail(emailValue)) setSuccessFor(email)
  else setErrorFor(email)

  const addressValue = address.value.trim()
  if (
    addressValue.split(/ |,/).filter((value: string) => value.length >= 5)
      .length === 3
  )
    setSuccessFor(address)
  else setErrorFor(address)

  const phoneValue = phone.value
  if (phoneValue.length === 17) setSuccessFor(phone)
  else setErrorFor(phone)

  const ccNameValue = ccName.value.trim()
  if (ccNameValue.length >= 3) setSuccessFor(ccName)
  else setErrorFor(ccName)

  const ccCscValue = ccCsc.value
  if (ccCscValue.length === 3) setSuccessFor(ccCsc)
  else setErrorFor(ccCsc)

  const ccExpValue = ccExp.value
  const values = ccExpValue.split(' / ')
  if (values.length === 2) {
    if (parseInt(values[0]) < 12 && parseInt(values[1]) <= 31)
      setSuccessFor(ccExp)
    else setErrorFor(ccExp)
  } else setErrorFor(ccExp)

  const ccNumberValue = ccNumber.value
  const valuesN = ccNumberValue.split(' ')
  if (valuesN.length === 4) setSuccessFor(ccNumber)
  else setErrorFor(ccNumber)
}

function setSuccessFor(input: HTMLInputElement) {
  const formControl =
    input.parentElement.parentElement.querySelector('.result-icon')
  formControl.innerHTML = `<svg-icon src="assets/check.svg"
  class="success">
  <svg xmlns="http://www.w3.org/2000/svg"
    width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
    class="feather feather-check">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
</svg-icon>`
}

function setErrorFor(input: HTMLInputElement) {
  const formControl =
    input.parentElement.parentElement.querySelector('.result-icon')
  formControl.innerHTML = `<svg-icon src="/assets/alert-icon.svg" 
  class="alert-icon">
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
    class="feather feather-alert-circle">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="8" x2="12" y2="12"></line>
    <line x1="12" y1="16" x2="12.01" y2="16"></line>
  </svg>
</svg-icon>`
}

function isEmail(email: string) {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  )
}

export default initialize
