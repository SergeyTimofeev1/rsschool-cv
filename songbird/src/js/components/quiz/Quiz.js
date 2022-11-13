//Корневой класс для элементов викторины

export class Quiz {
  constructor(selector,options) {
    this.$el = document.querySelector(selector)
    this.components = options.components || []
  }
  
  toHTML() {
    return ''
  }
}