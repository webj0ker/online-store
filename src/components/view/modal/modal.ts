import '../modal/modal.css'

function viewModal() {
  const listProductsA = document.querySelectorAll('[href="#openModal"]')
  listProductsA.forEach((value: Element) => {
    value.addEventListener('click', function () {
      const scrollbar = document.body.clientWidth - window.innerWidth + 'px'
      document.body.style.overflow = 'hidden'
      document.querySelector<HTMLElement>('#openModal').style.marginLeft =
        scrollbar
    })
  })
  const btnClose = document.querySelector('[href="#close"]')
  btnClose.addEventListener('click', function () {
    document.body.style.overflow = 'visible'
    document.querySelector<HTMLElement>('#openModal').style.marginLeft = '0px'
  })
  // document.addEventListener("DOMContentLoaded", function(){
  //   const scrollbar = document.body.clientWidth - window.innerWidth + 'px';
  //   console.log(scrollbar);
  //   document.querySelector('[href="#openModal"]').addEventListener('click',function(){
  //     document.body.style.overflow = 'hidden';
  //     document.querySelector<HTMLElement>('#openModal').style.marginLeft = scrollbar;
  //   });
  //   document.querySelector('[href="#close"]').addEventListener('click',function(){
  //     document.body.style.overflow = 'visible';
  //     document.querySelector<HTMLElement>('#openModal').style.marginLeft = '0px';
  //   });
  // });
}

export default viewModal
