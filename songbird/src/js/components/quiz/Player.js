import { getRandomData } from '../../core/data.js'
import { QuizComponent } from '../../core/QuizComponent.js'
import { getRandomBird } from '../../core/data.js';

export class Player extends QuizComponent {
  static className = 'quiz-player'
  
  constructor($root) {
    super($root, {
      name: 'player',
      listeners: ['click']
    })
    this.data = getRandomData()
    this.bird = getRandomBird()
    this.birdId = getRandomBird().id
  }

  // listeners

  onClick(e) {
    const target = e.target
    const playerNode = document.getElementById('quiz-audio')

    if(target.closest('button') && target.closest('.play')) {
      playSong(target,playerNode)
    }
    if(target.closest('button') && target.closest('.pause')) {
      stopSong(target,playerNode)
    }
  }

  getRandomSong() {
    console.log(getRandomData())
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

function playSong(target,playerNode) {
  playerNode.play()
  target.setAttribute('disabled','true')
  target.previousElementSibling.removeAttribute('disabled')
}

function stopSong(target,playerNode) {
  playerNode.pause()
  target.setAttribute('disabled','true')
  target.nextElementSibling.removeAttribute('disabled')
}

