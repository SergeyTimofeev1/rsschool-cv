import {$} from '../../core/Dom.js'
import { data, bird } from '../../core/data.js';
import { Emitter } from '../../core/Emitter.js';

//Корневой класс для элементов викторины

export class Quiz {

  constructor(selector, options) {
    this.$el = $(selector)
    this.components = options.components || [],
    this.stage = options.stage
    this.emitter = new Emitter()
  }

  getRoot() {
    const $root = $.create('div', 'quiz-container')
    const componentOptions = {
      emitter: this.emitter
    }

    this.components = this.components.map((Component) => {
      const $el = $.create('div', Component.className)
      const component = new Component($el, data, bird, this.stage, componentOptions)
      $el.html(component.toHTML()) 
      $root.append($el)
      return component
    })
    return $root
  }

  render() {
    this.$el.append(this.getRoot())
    this.components.forEach((component) => {
      component.init()
    })
  }

  toHTML() {
    return ''
  }
}
