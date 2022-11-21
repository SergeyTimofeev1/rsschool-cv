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
    // this.stageId = 1
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
    this.emitter.subscribe('Change stage', (stageId,newBird) => {
      const stages = this.$root.$el.children
      
      console.log(stages);
      changeCurrentStageIndication(stages)
    })
  }

  onClick(e) {

  }
}

// helpers

function changeCurrentStageIndication(stages) {
  for(let stage of stages) {
    if(stage.classList.contains('current')) {
      stage.classList.remove('current')
    }
  }
}



