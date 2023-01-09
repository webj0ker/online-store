import '../slider/slider.css'

let indexValue = 1

function initialize() {
  const slider = document.querySelectorAll<HTMLSpanElement>('.btm-slides span')
  slider.forEach((value: HTMLSpanElement) => {
    value.addEventListener('click', btm_slide)
  })
  const sides = document.querySelectorAll<HTMLSpanElement>('.sliders')
  sides.forEach((value: HTMLSpanElement) => {
    value.addEventListener('click', (e: Event) => {
      side_slide(parseInt((e.currentTarget as HTMLElement).id))
    })
  })
  showImg(indexValue)
}

function btm_slide(e: Event) {
  const index = parseInt((e.target as HTMLElement).id)
  indexValue = index
  showImg(indexValue)
}
function side_slide(e: number) {
  indexValue += e
  showImg(indexValue)
}
function showImg(e: number) {
  let i
  const img = document.querySelectorAll<HTMLImageElement>('.images img')
  const slider = document.querySelectorAll<HTMLSpanElement>('.btm-slides span')
  if (e > img.length) {
    indexValue = 1
  }
  if (e < 1) {
    indexValue = img.length
  }
  for (i = 0; i < img.length; i++) {
    img[i].style.display = 'none'
  }
  for (i = 0; i < slider.length; i++) {
    slider[i].style.background = 'rgba(255,255,255,0.1)'
  }
  img[indexValue - 1].style.display = 'block'
  slider[indexValue - 1].style.background = 'white'
}

export default initialize
