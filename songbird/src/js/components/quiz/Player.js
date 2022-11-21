import { getRandomData, getRandomBird } from '../../core/data.js'
import { Emitter } from '../../core/Emitter.js'
import { QuizComponent } from '../../core/QuizComponent.js'

export class Player extends QuizComponent {
  static className = 'quiz-player'
  
  constructor($root, data, bird, options) {
    super($root, {
      name: 'player',
      listeners: ['click','timeupdate'],
      ...options
    })
    this.data = data
    this.bird = bird
    this.birdId = this.bird.id
    this.answerId = null
    this.birdName = '***'
    this.birdImg = "/img/quiz/quiz-player.jpeg"
    this.score = 0
  }

  // listeners

  onClick(e) {
    const target = e.target
    const playerNode = document.getElementById('quiz-audio')
    const answersNode = document.querySelector('.quiz-action__answers')

    if(target.closest('button') && target.closest('.play')) {
      console.log(this.bird.name);
      playSong(target,playerNode,answersNode)
    }

    if(target.closest('button') && target.closest('.pause')) {
      stopSong(target,playerNode)
    }
  }

  onTimeupdate(e) {
    updateProgressBar()
  }

  init() {
    super.init()
    this.emitter.subscribe('Change stage', (stageId, newBird) => {
      this.data = getRandomData(stageId)
      this.bird = newBird
      this.birdName = '***'
      this.birdImg = "/img/quiz/quiz-player.jpeg"
      console.log({player:this.bird.name});
      this.reRenderHTML()
    })

    this.emitter.subscribe('show correct bird', birdId => {
      const correctBird = this.data[birdId-1]
      this.birdName = correctBird.name
      this.birdImg = correctBird.image
      this.reRenderHTML()
    })

    this.emitter.subscribe('change score', wrongPoints => {
      const calcScore = 5 - wrongPoints
      const scoreNode = document.querySelector('.quiz-player__score')
      this.score += calcScore
      scoreNode.textContent = `Ваш счет: ${this.score}`
    })
  }

  reRenderHTML() {
    this.$root.$el.textContent = ''
    this.$root.$el.insertAdjacentHTML('afterbegin', this.toHTML())
  }

  
  toHTML() {
    const playerTemplate = 
      `
        <div class="quiz-player__inner">
          <img
            class="quiz-player__img"
            src=${this.birdImg}
            alt="quiz-player"
          />
        <div class="quiz-player__info">
            <h3 class="quiz-player__title">${this.birdName}</h3>
            <div class="quiz-player__score">Ваш счет: ${this.score}</div>
            <div class="quiz-player__progress-bar-wrapper">
              <div class="quiz-player__progress-bar"></div>
            </div>
            <audio
              class="quiz-player__audio"
              id="quiz-audio"
              src="${this.bird.audio}"
              preload="auto"
            ></audio>
            <div class="quiz-player__buttons">
              <button class="quiz-player__button pause" id="button-pause" disabled>
                <span class="material-symbols-outlined">pause</span>
              </button>
              <button class="quiz-player__button play" id="button-play">
                <span class="material-symbols-outlined"> play_arrow </span>
              </button>
            </div>
          </div>
      </div> 
      `
    return playerTemplate
  }
}

export function playSong(target,playerNode,answersNode) {
  playerNode.play()
  target.setAttribute('disabled','true')
  target.previousElementSibling.removeAttribute('disabled')
  answersNode.classList.remove('disabled')
}

export function stopSong(target,playerNode) {
  playerNode.pause()
  target.setAttribute('disabled','true')
  target.nextElementSibling.removeAttribute('disabled')
}

export function updateProgressBar(e) {
  console.log('update');
}

