const rootSelector = '[data-js-form]'

class FormValidation {
  selectors = {
    root: rootSelector,
    field: '[data-js-form-field]',
    errorSpan: '[data-js-form-field-error]'
  }

  errorMessages = {
    valueMissing: () => 'Заполните это поле.',
    patternMismatch: ({ title }) => title || 'Данные заполнены некорректно.',
    tooLong: ({ maxLength }) => `Максимально допустимое количество символов - ${maxLength}.`,
    tooShort: ({ minLength }) => `Минимальное количество символов - ${minLength}.`,
  }

  constructor(rootElement) {
    this.rootElement = rootElement
    this.bindEvents()
  }

  manageErrors(fieldControlElement, errorMessages) {
    const fieldElement = fieldControlElement.closest(this.selectors.field)
    const errorSpanElement = fieldElement.querySelector(this.selectors.errorSpan)

    if (errorMessages.length === 0) {
      errorSpanElement.innerHTML = ''
    } else  {
      errorSpanElement.innerHTML = errorMessages.map(errorMessage => {
        return `<span class="field__error-span" id="email-error">${errorMessage}</span>`
      }).join('')
    }
  }

  getErrors(fieldControlElement) {
    const validityErrors = fieldControlElement.validity
    const errorMessages = []

    Object.entries(this.errorMessages).forEach(([errorType, errorMessage]) => {
      if (validityErrors[errorType]) {
        errorMessages.push(errorMessage(fieldControlElement))
      }
    })

    return errorMessages
  }

  validateField(fieldControlElement) {
    if (!fieldControlElement.required) return

    const errorsMessages = this.getErrors(fieldControlElement)
    const isValid = errorsMessages.length === 0

    this.manageErrors(fieldControlElement, errorsMessages)
    fieldControlElement.ariaInvalid = !isValid

    return isValid
  }

  onBlur = ({ target }) => {
    const isFormFieldControlElement = target.closest(this.selectors.root)

    if (isFormFieldControlElement) {
      this.validateField(target)
    }
  }

  onChange = ({ target }) => {
    const isToggleType = ['radio', 'checkbox'].includes(target.type)

    if (isToggleType) {
      this.validateField(target)
    }
  }

  onSubmit = (event) => {
    const { target } = event

    let isFormValid = true
    let firstInvalidFieldElement = null

    const requiredFields = [...target.elements].filter(({ required }) => required)

    requiredFields.forEach(fieldControlElement => {
      const isFieldValid = this.validateField(fieldControlElement)

      if (!isFieldValid) {
        if (!firstInvalidFieldElement) {
          firstInvalidFieldElement = fieldControlElement
        }

        isFormValid = !isFormValid
      }

      if (!isFormValid) {
        event.preventDefault()
        firstInvalidFieldElement.focus()
      }
    })
  }

  bindEvents() {
    this.rootElement.addEventListener('blur', this.onBlur, true)
    this.rootElement.addEventListener('change', this.onChange)
    this.rootElement.addEventListener('submit', this.onSubmit)
  }
}

class FormValidationsCollection {
  constructor() {
    this.init()
  }

  init() {
    document.querySelectorAll(rootSelector)
      .forEach(element => new FormValidation(element))
  }
}

export default FormValidationsCollection