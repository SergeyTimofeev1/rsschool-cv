import { DomListeners } from "./DomListeners.js"
// класс для логики и функционала от которого наследуются все компоненты Quiz
export class QuizComponent extends DomListeners {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.emitter = options.emitter 
  }
  // Возвращает шаблон компонентов
  toHTML() {
    return ''
  }

  init() {
    this.initDOMListeners()
  }

}