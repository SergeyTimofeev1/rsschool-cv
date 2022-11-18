import { QuizComponent } from '../../core/QuizComponent.js'
import { getRandomData, getRandomBird } from '../../core/data.js';

export class Stages extends QuizComponent {

  static className = 'quiz-info'
  
  constructor($root,data,bird,options) {
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
        <div class="quiz-info__stage current" data-stage="0">Уровень 1</div>
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
    const target = e.target
    const stageId = e.target.dataset.stage
    const stages = this.$root.$el.children
    let newBird = getRandomBird(stageId)

    this.emitter.emit('Change stage', stageId,newBird)

    changeCurrentStageIndication(stages,target)

  }
}

// helpers


function changeCurrentStageIndication(stages, target) {
  if(!target.classList.contains('current')) {
    for(let stage of stages) {
      if(stage.classList.contains('current')) {
        stage.classList.remove('current')
      }
    }
    target.classList.add('current')
   }
}
