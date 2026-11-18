class Header {
  selectors = {
    root: '[data-js-header]',
    overlay: '[data-js-header-overlay]',
    burgerButton: '[data-js-header-burger-button]',
  }

  stateClasses = {
    isActive: 'is-active',
    isLock: 'is-lock',
  }

  constructor() {
    this.rootElement = document.querySelector(this.selectors.root)
    this.overlayElement = this.rootElement.querySelector(this.selectors.overlay)
    this.burgerButtonElement = this.rootElement.querySelector(this.selectors.burgerButton)
    this.bindEvents()
  }

  onBurgerButtonClick = () => {
    this.burgerButtonElement.classList.toggle(this.stateClasses.isActive)
    this.overlayElement.classList.toggle(this.stateClasses.isActive)
    document.documentElement.classList.toggle(this.stateClasses.isLock)
  }

  bindEvents() {
    this.burgerButtonElement.addEventListener('click', this.onBurgerButtonClick)
  }
}

export default Header

// const rootElement = document.querySelector('[data-js-main]')
// const button = document.querySelector('[data-js-button]')
//
//
//
// const onClick = ({ target }) => {
//   target.classList.toggle('is-active')
//
//   if (!rootElement.classList.contains('is-active')) {
//     const oldHeight = rootElement.scrollHeight
//     rootElement.style.height = 'auto'
//     rootElement.style.height = `${oldHeight}px`
//     rootElement.style.height = rootElement.scrollHeight + 'px'
//     rootElement.classList.add('is-active')
//   } else {
//     rootElement.style.height = `692px`
//     rootElement.classList.remove('is-active')
//   }
// }
//
// button.addEventListener('click', onClick)