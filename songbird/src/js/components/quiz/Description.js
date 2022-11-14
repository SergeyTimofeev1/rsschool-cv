import { QuizComponent } from "../../core/QuizComponent.js";

export class Description extends QuizComponent {
  static className = 'quiz-action__description"'
  
  constructor() {
    super($root, {
      name: 'description',
      listeners: []
    })
  }

  toHTML() {
    const descriptionTemplate = 
      `
        <div class="quiz-action__description">
          <p class="quiz-action__text">
            ${this.description}
          </p>
        </div>
      `
    return descriptionTemplate
  }
}