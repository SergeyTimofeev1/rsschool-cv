import { QuizComponent } from '../../core/QuizComponent.js'

export class Info extends QuizComponent {
  toHTML() {
    const infoTemplate = `
      <div class="quiz__info quiz-info">
        <div class="quiz-info__stage active" data-stage="1">Stage 1</div>
        <div class="quiz-info__stage" data-stage="2">Stage 2</div>
        <div class="quiz-info__stage" data-stage="3">Stage 3</div>
        <div class="quiz-info__stage" data-stage="4">Stage 4</div>
        <div class="quiz-info__stage" data-stage="5">Stage 5</div>
        <div class="quiz-info__stage" data-stage="6">Stage 6</div>
      </div>
    `
    return infoTemplate
  }
}
