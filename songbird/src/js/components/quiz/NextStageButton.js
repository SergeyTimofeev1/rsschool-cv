import { QuizComponent } from "../../core/QuizComponent.js";
import { getRandomBird } from "../../core/data.js";

export class NextStageButton extends QuizComponent {
  static className = 'quiz-next'
  
  constructor($root, data, bird, options) {
    super($root, {
      name: 'player',
      listeners: ['click'],
      ...options
    })
    this.data = data
    this.bird = bird
    this.birdId = this.bird.id
    this.score = 0
    this.stageId = 1
  }

  init() {
    super.init()
    this.emitter.subscribe('show next button', _data => {
      this.$root.$el.classList.add('active')
    })

    this.emitter.subscribe('final stage', (length, stage) => {
      if(length == stage) {
        this.$root.$el.style.display = 'none'
      }
    })
  }

  // listeners

  onClick(e) {
    let stageId = this.stageId++
    let newBird = getRandomBird(stageId)
    this.emitter.emit('Change stage', stageId,newBird)
    this.$root.$el.classList.remove('active')
  }

  toHTML() {
    return `
      <button class='quiz-next__button'>Далее</button>
    `
  }
}

