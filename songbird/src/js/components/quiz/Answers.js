import { QuizComponent } from '../../core/QuizComponent.js'
import { getRandomData } from '../../core/data.js'
import { Answer } from './Answer.js'
// import { Description } from './Description.js'

export class Answers extends QuizComponent {
  static className = 'quiz-action__answers'
  
  constructor($root) {
    super($root, {
      name: 'Answers',
      listeners: ['click']
    })

  }

  // listeners
  
  onClick(e) {
    const target = e.target
    if (target.closest('label')) {
      const answerId = target.parentNode.id
      this.getDescription(answerId)
    }
  }

  getAnswer() {
    const answersArray = []
    for (let i = 0; i < getRandomData().length; i++) {
      const answer = new Answer('quiz-action__answer',getRandomData()[i].name, i+1)
      answersArray.push(answer.toHTML())
    }
    return answersArray.join('')
  }

  getDescription(id) {
    if(id) {
      const descr = document.querySelector('.quiz-action__text')
      descr.textContent = getRandomData()[id - 1].description
    }
    return 'Выберете правильный вариант ответа!!!'
  }

  toHTML() {
    const answersTemplate = 
      `
        <div class="quiz__action quiz-action">
          <div class=quiz-action__answers>
            ${this.getAnswer()}
          </div>
          <div class="quiz-action__description">
            <p class="quiz-action__text">
            ${this.getDescription()}
            </p>
          </div>
        </div>
      `
    return answersTemplate
  }
}
