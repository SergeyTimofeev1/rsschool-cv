import { QuizComponent } from "../../core/QuizComponent.js";

export class Description extends QuizComponent {
  static className = 'quiz-action__description"'
  
  constructor($root,description) {
    super($root, {
      name: 'description',
      listeners: []
    })

    this.description = description
  }

  toHTML() {
    const descriptionTemplate = 
      `
          <p class="quiz-action__text">
            ${this.description}
          </p>
      `
    return descriptionTemplate
  }
}