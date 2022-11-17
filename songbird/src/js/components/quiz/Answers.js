import { QuizComponent } from '../../core/QuizComponent.js'
import { getRandomBird, getRandomData } from '../../core/data.js'
import { Answer } from './Answer.js'
import {$} from '../../core/Dom.js'

export class Answers extends QuizComponent {
  static className = 'quiz__wrapper'
  
  constructor($root) {
    super($root, {
      name: 'Answers',
      listeners: ['click']
    })

    this.data = getRandomData()
    this.bird = getRandomBird()
    this.birdName = this.bird.name
    this.birdId = this.bird.id
    this.answerId = null
    this.score = 6
    this.movesCounter = 0
  }

  // listeners

  onClick(e) {
    const target = e.target
    if (target.closest('label')) {
      this.answerId = target.parentNode.id
      this.movesCounter++
      this.changeScore()
      console.log(this.movesCounter);

      if(this.birdId == this.answerId) {
        this.getDescription(this.answerId)
        target.parentNode.classList.add('correct')
      } else {
        target.parentNode.classList.add('wrong')
      }
    }
  }

  changeScore() {
    let scoreNode = document.querySelector('.quiz-player__score')
    if(this.birdId == this.answerId) {
      // this.score += 5
      scoreNode.textContent = `Ваш счет ${this.score - this.movesCounter}`
    }
  }

  getAnswer() {
    const answersArray = []
    for (let i = 0; i < this.data.length; i++) {
      const answer = new Answer('quiz-action__answer',this.data[i].name, i+1)
      answersArray.push(answer.toHTML())
    }
    return answersArray.join('')
  }

  getDescription(id) {
    if(id) {
      const descr = document.querySelector('.quiz-action__text')
      descr.textContent = this.data[id - 1].description
    }
    return 'Выберете правильный вариант ответа!!!'
  }

  toHTML() {
    console.log({answers: this.bird});
    const answersTemplate = 
      `
        <div class="quiz__action quiz-action">
          <div class="quiz-action__answers disabled">
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
