
import { QuizComponent } from '../../core/QuizComponent.js' 

export class Answer extends QuizComponent {
  static className = 'quiz-action__answer'
  
  constructor($root, name, index ) {
    super($root, {
      name: 'answer',
      listeners: []
    })
    this.name = name
    this.index = index
  }

  toHTML() {
    const answerTemplate = 
    `
      <div class="quiz-action__answer">
        <input
          class="quiz-action__input"
          type="radio"
          id="answer-${this.index}"
          name="answer"
        />
        <label for="answer-${this.index}">${this.name}</label>
      </div>
    `
    return answerTemplate
  }
}