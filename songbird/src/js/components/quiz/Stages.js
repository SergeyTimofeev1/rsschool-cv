import { QuizComponent } from '../../core/QuizComponent.js'
import { getRandomData, getRandomBird } from '../../core/data.js';

export class Stages extends QuizComponent {

  static className = 'quiz-info'
  
  constructor($root,data,bird,options) {
    super($root, {
      name: 'quiz-stage',
      listeners: [],
      ...options
    })
    this.data = data
    this.bird = bird
    this.stage = 1
    this.stages = this.$root.$el.children
  }

  toHTML() {
    const stageTemplate = `
        <div class="quiz-info__stage current" data-stage="1">Уровень 1</div>
        <div class="quiz-info__stage" data-stage="2">Уровень 2</div>
        <div class="quiz-info__stage" data-stage="3">Уровень 3</div>
        <div class="quiz-info__stage" data-stage="4">Уровень 4</div>
        <div class="quiz-info__stage" data-stage="5">Уровень 5</div>
        <div class="quiz-info__stage" data-stage="6">Уровень 6</div>
        `
    return stageTemplate
  }

  init() {
    super.init()
    this.emitter.subscribe('Change stage', (_stageId,_newBird) => {
      changeCurrentStageIndication(this.stages)
      this.stage++
      this.toHTML()
      this.emitter.emit('final stage', this.stages.length,this.stage)
    })
  }
}

// helpers

function changeCurrentStageIndication(stages) {
  for(let stage of stages) {
    if(stage.classList.contains('current')) {
      stage.classList.remove('current')
      stage.classList.add('success')
      stage.nextElementSibling.classList.add('current')
      stage.textContent = 'Пройдено'
      return
    }
  }
}


