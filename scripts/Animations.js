import MatchMedia from "./MatchMedia.js";

class Animations {
  selectors = {
    root: '[data-js-animate-group]',
    animated: '[data-js-animated]',
    observable: '[data-js-observable]',
  }

  stateClasses = {
    isAnimated: 'is-animated',
  }

  constructor() {
    this.animatedElements = document.querySelectorAll(this.selectors.animated)
    this.observableElements = document.querySelectorAll(this.selectors.observable)
    this.observer = new IntersectionObserver(this.onObserve, this.getObserverOptions())
    this.bindEvents()
    this.init()
  }

  init() {
    this.animateElements()
    this.observeElements()
  }

  getObserverOptions() {
    return MatchMedia.mobile.matches
      ? {
        root: null,
        rootMargin: `0px 0px -${Math.round(window.innerHeight * 0.27)}px  0px`,
      }
      : {
        root: null,
        threshold: 0.2,
      }
  }

  observeElements() {
    this.observableElements.forEach(element => this.observer.observe(element))
  }

  animateElements() {
    this.animatedElements.forEach((element) => {
      element.classList.add(this.stateClasses.isAnimated)
    })
  }

  onObserve = (entries, observer) => {
    entries.forEach(({ target, isIntersecting }) => {
      if (isIntersecting) {
        target.classList.add(this.stateClasses.isAnimated)
        observer.unobserve(target)
      }
    })
  }

  onMatchMediaChange = () => {
    this.observer.disconnect()
    this.observer = new IntersectionObserver(this.onObserve, this.getObserverOptions())
    this.observeElements()
  }

  bindEvents() {
    MatchMedia.mobile.addEventListener('change', this.onMatchMediaChange)
  }
}

export default Animations