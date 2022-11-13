// Приложение

import { Quiz } from './components/quiz/Quiz.js';
import { Player } from './components/quiz/Player.js';
import { Asnwers } from './components/quiz/Answers.js';
import { Info } from './components/quiz/Info.js';

const quiz = new Quiz('#quiz-container', {
  components: [Info, Player, Asnwers],
})

quiz.render()

// [Info, Player, Asnwers],
