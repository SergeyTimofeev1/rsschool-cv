import { QuizComponent } from '../../core/QuizComponent.js'
import { Stages } from './Stages.js'
import { Answer } from './Answer.js'
import {$} from '../../core/Dom.js'
import { getRandomBird, getRandomData } from '../../core/data.js';
import { Quiz } from './Quiz.js';

export class Answers extends QuizComponent {
  static className = 'quiz__wrapper'
  
  constructor($root,data,bird, options) {
    super($root, {
      name: 'Answers',
      listeners: ['click'],
      ...options,
    })
    this.data = data
    this.bird = bird
    this.birdName = this.bird.name
    this.birdId = this.bird.id
    this.answerId = null
    this.score = 6
  }

  onClick(e) {
    const target = e.target
    this.answerId = target.id
    this.getDescription(this.answerId)


    
    if (isWon(this.birdId,this.answerId)) {
      this.emitter.emit('show correct bird', this.birdId)
      this.emitter.emit('show next button')
      this.emitter.emit('change score', getwrongAnswers())
    }

    selectCorrectAnswer(target,this.birdId,this.answerId,this.$root.$el.firstElementChild)
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
    return 'Выберете правильный вариант ответа.'
  }

  init() {
    super.init()
    this.emitter.subscribe('Change stage', (stageId,newBird) => {
      this.data = getRandomData(stageId)
      this.bird = newBird
      this.birdId = this.bird.id
      this.$root.$el.textContent = ''
      this.$root.$el.insertAdjacentHTML('afterbegin', this.toHTML())
      console.log({answer:this.bird.name});
    })
  }

  toHTML() {
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

// helpers

function isWon(birdId, answerId) {
  return birdId == answerId
}

function selectCorrectAnswer(target,birdId,answerId,root) {
  if(birdId == answerId) {
    target.classList.add('correct')
    root.firstElementChild.classList.add('disabled')
  } else {
    target.classList.add('wrong')
  }
}

function getwrongAnswers() {
  const answers =  document.querySelectorAll('.wrong')
  let wrongAnswers = answers.length

  return wrongAnswers
}
