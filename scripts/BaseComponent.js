class BaseComponent {
  constructor() {
    if (this.constructor === BaseComponent) {
      throw new Error('Невозможно создать экземпляр абстрактного класса BaseComponent!')
    }
  }

  /*
  * При прохождении через Proxy теряются свойства объекта состояния
  * по этому не получается наследовать метод из базового компонента.
  */

  // getProxyState(initialState) {
  //   return new Proxy(initialState, {
  //     get: (target, prop) => target[prop],
  //     set: (target, prop, newValue) => {
  //       const oldValue = target[prop]
  //
  //       if (oldValue !== newValue) {
  //         this.updateUI()
  //       }
  //
  //       return true
  //     },
  //   })
  // }

  /* Перерисовка UI в ответ на изменения состояния */
  updateUI() {
    throw new Error('Необходимо реализовать метод updateUI!')
  }
}

export default BaseComponent