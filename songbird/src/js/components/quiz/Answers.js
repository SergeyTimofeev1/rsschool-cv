import { QuizComponent } from '../../core/QuizComponent.js'
import { getRandomData } from '../../core/data.js'
import { Answer } from './Answer.js'
import { Description } from './Description.js'

export class Answers extends QuizComponent {
  static className = 'quiz-action__answers'
  
  constructor($root) {
    super($root, {
      name: 'Answers',
      listeners: []
    })
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
      const descrArr = []
      for (let i = 0; i < getRandomData().length; i++) {
        const answer = new Description(getRandomData()[i].description)
        descrArr.push(answer.toHTML())
      }
      return descrArr.join('')
    }
    return '***'
  }

  toHTML() {
    const answersTemplate = 
      `
        <div class="quiz__action quiz-action">
          <div class=quiz-action__answers>
          ${this.getAnswer()}
          </div>
          ${this.getDescription()}
        </div>
      `
    return answersTemplate
  }
}
