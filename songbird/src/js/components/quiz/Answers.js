import { QuizComponent } from '../../core/QuizComponent.js'

export class Asnwers extends QuizComponent {
  toHTML() {
    const answersTemplate = `  
      <div class="quiz__action quiz-action">
        <div class="quiz-action__answers">
          <div class="quiz-action__answer">
            <input
              class="quiz-action__input"
              type="radio"
              id="answer-1"
              name="answer"
            />
            <label for="answer-1">Some bird</label>
          </div>
          <div class="quiz-action__answer">
            <input
              class="quiz-action__input"
              type="radio"
              id="answer-2"
              name="answer"
            />
            <label for="answer-2">Some bird</label>
          </div>
          <div class="quiz-action__answer">
            <input
              class="quiz-action__input"
              type="radio"
              id="answer-3"
              name="answer"
            />
            <label for="answer-3">Some bird</label>
          </div>
          <div class="quiz-action__answer">
            <input
              class="quiz-action__input"
              type="radio"
              id="answer-4"
              name="answer"
            />
            <label for="answer-4">Some bird</label>
          </div>
          <div class="quiz-action__answer">
            <input
              class="quiz-action__input"
              type="radio"
              id="answer-5"
              name="answer"
            />
            <label for="answer-5">Some bird</label>
          </div>
        <div class="quiz-action__answer">
          <input
            class="quiz-action__input"
            type="radio"
            id="answer-6"
            name="answer"
          />
          <label for="answer-6">Some bird</label>
        </div>
      </div>
      <div class="quiz-action__description">
      <p class="quiz-action__text">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita fuga
        nihil perspiciatis veniam eos eveniet quas consequuntur asperiores?
        Beatae explicabo quae fugiat qui hic obcaecati culpa doloribus nisi quia
        error!
      </p>
    </div>
      `
    return answersTemplate
  }
}
