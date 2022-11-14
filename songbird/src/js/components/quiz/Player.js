import { QuizComponent } from '../../core/QuizComponent.js'

export class Player extends QuizComponent {
  static className = 'quiz-player'
  
  constructor($root) {
    super($root, {
      name: 'player',
      listeners: []
    })
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
            src="#"
            preload="auto"
          ></audio>
          <div class="quiz-player__buttons">
            <button class="quiz-player__button pause" id="button-pause" disabled>
              <span class="material-symbols-outlined"> pause </span>
            </button>
            <button class="quiz-player__button play" id="button-play">
              <span class="material-symbols-outlined"> chevron_right </span>
            </button>
          </div>
        </div>
      </div> 
      `
    return playerTemplate
  }
}
