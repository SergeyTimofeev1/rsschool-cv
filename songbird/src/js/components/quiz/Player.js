import { getRandomData } from '../../core/data.js'
import { QuizComponent } from '../../core/QuizComponent.js'

export class Player extends QuizComponent {
  static className = 'quiz-player'
  
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
  }

  // listeners

  onClick(e) {
    const target = e.target
    const playerNode = document.getElementById('quiz-audio')
    const answersNode = document.querySelector('.quiz-action__answers')

    if(target.closest('button') && target.closest('.play')) {
      playSong(target,playerNode,answersNode)
    }

    if(target.closest('button') && target.closest('.pause')) {
      stopSong(target,playerNode)
    }
  }

  init() {
    super.init()
  }
  
  toHTML() {

    const playerTemplate = 
      `
        <div class="quiz-player__inner">
          <img
            class="quiz-player__img"
            src="/img/quiz/quiz-player.jpeg"
            alt="quiz-player"
          />
        <div class="quiz-player__info">
            <h3 class="quiz-player__title">Title</h3>
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

