import pxToRem from "./utils/pxToRem.js";

const rootSelector = '[data-js-expandable-content]'

class ExpandableContent {
  selectors = {
    root: rootSelector,
    button: '[data-js-expandable-content-button]',
  }

  stateClasses = {
    isExpanded: 'is-expanded',
  }

  animationParams = {
    duration: 700,
    easing: 'ease',
  }

  initialHeight = null
  isExpanded = false

  constructor(rootElement) {
    this.rootElement = rootElement
    this.buttonElement = this.rootElement.querySelector(this.selectors.button)
    this.bindEvents()
  }

  animate(initialHeight, newHeight) {
    this.isExpanded = !this.isExpanded
    this.rootElement.classList.toggle(this.stateClasses.isExpanded, this.isExpanded)
    this.buttonElement.classList.toggle(this.stateClasses.isExpanded, this.isExpanded)
    this.rootElement.animate([
      {
        maxHeight: `${pxToRem(initialHeight)}rem`,
      },
      {
        maxHeight: `${pxToRem(newHeight)}rem`,
      },
    ], this.animationParams)
  }

  collapse() {
    const currentScroll = window.scrollY

    this.animate(this.rootElement.scrollHeight, this.initialHeight)

    window.scrollTo({
      top: currentScroll,
      behavior: "instant",
    })
  }

  expand() {
    const { offsetHeight, scrollHeight } = this.rootElement

    this.initialHeight = offsetHeight
    this.animate(offsetHeight, scrollHeight)
  }

  onButtonClick = () => {
    if (this.rootElement.classList.contains(this.stateClasses.isExpanded)) {
      this.collapse()
    } else {
      this.expand()
    }
  }

  bindEvents() {
    this.buttonElement.addEventListener('click', this.onButtonClick)
  }
}

class ExpandableContentCollection {
  constructor() {
    this.init()
  }

  init() {
    document.querySelectorAll(rootSelector).forEach(item => {
      new ExpandableContent(item)
    })
  }
}

export default ExpandableContentCollection