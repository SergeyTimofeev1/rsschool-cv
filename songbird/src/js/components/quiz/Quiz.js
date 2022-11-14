import {$} from '../../core/Dom.js'

//Корневой класс для элементов викторины

export class Quiz {

  constructor(selector, options) {
    this.$el = $(selector)
    this.components = options.components || []
  }

  getRoot() {

    const $root = $.create('div', 'quiz-container')

    this.components = this.components.map((Component) => {
      const $el = $.create('div', Component.className)
      const component = new Component($el)
      $el.html(component.toHTML()) 
      $root.append($el)
      return component
    })
    console.log($root);
    return $root

  }

  render() {
    console.log(this.$el);
    this.$el.append(this.getRoot())

    this.components.forEach((component) => {
      component.init()
    })
  }

  toHTML() {
    return ''
  }
}
