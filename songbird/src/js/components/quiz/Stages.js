import { QuizComponent } from '../../core/QuizComponent.js'

export class Stages extends QuizComponent {

  static className = 'quiz-info'
  
  constructor($root,data,bird,stage, options) {
    super($root, {
      name: 'quiz-stage',
      listeners: ['click'],
      ...options
    })
    this.data = data
    this.bird = bird
  }

  toHTML() {
    const stageTemplate = `
        <div class="quiz-info__stage active" data-stage="0">Уровень 1</div>
        <div class="quiz-info__stage" data-stage="1">Уровень 2</div>
        <div class="quiz-info__stage" data-stage="2">Уровень 3</div>
        <div class="quiz-info__stage" data-stage="3">Уровень 4</div>
        <div class="quiz-info__stage" data-stage="4">Уровень 5</div>
        <div class="quiz-info__stage" data-stage="5">Уровень 6</div>
    `
    return stageTemplate
  }

  init() {
    super.init()
  }

  onClick(e) {
    const stageId = e.target.dataset.stage
    this.emitter.emit('Change stage', stageId)
  }
}
