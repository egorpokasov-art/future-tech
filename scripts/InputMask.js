const rootSelector = '[data-js-input-mask]'

class InputMask {
  templates = {
    russian: '+7 (***) *** ** **'
  }

  constructor(rootElement) {
    this.rootElement = rootElement
    this.init()
    this.bindEvents()
  }

  init() {
    const isLibReady = typeof window.IMask !== 'undefined'

    if (isLibReady) {
      window.IMask(
        this.rootElement,
        {
          mask: this.rootElement.dataset.jsInputMask,
        }
      )
    } else {
      console.error('Библиотека IMask не подключена!')
    }
  }

  onInput = ({ target }) => {
    const value = target.value

    target.value = this.templates.russian.replace('*', value)
  }

  bindEvents() {
    // this.rootElement.addEventListener('input', this.onInput)
  }
}

class InputMaskCollection {
  constructor() {
    this.init()
  }

  init() {
    document.querySelectorAll(rootSelector)
      .forEach(element => new InputMask(element))
  }
}

export default InputMaskCollection