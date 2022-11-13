//Корневой класс для элементов викторины

export class Quiz {
  constructor(selector, options) {
    this.$el = document.querySelector(selector)
    this.components = options.components || []
  }

  getRoot() {
    this.components.forEach((Component) => {
      const component = new Component();
      this.$el.insertAdjacentHTML('beforeend', component.toHTML())
    });
  }

  render() {
    this.$el.append(this.getRoot())
  }

  toHTML() {
    return ''
  }
}
