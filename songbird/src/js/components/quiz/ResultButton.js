import { QuizComponent } from "../../core/QuizComponent.js";
import { getRandomBird } from "../../core/data.js";

export class ResultButton extends QuizComponent {
  static className = 'quiz-result'
  
  constructor($root, data, bird, options) {
    super($root, {
      name: 'result',
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

  }

  // listeners

  onClick(e) {

  }

  toHTML() {
    return `
      <button class='quiz-next__button'>
        <a class='quiz-result__link' href='result.html'> Увидеть результат</a>
      </button>
    `
  }
}


