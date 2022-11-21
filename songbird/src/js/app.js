// Приложение

import { Quiz } from './components/quiz/Quiz.js';
import { Player } from './components/quiz/Player.js';
import { Answers } from './components/quiz/Answers.js';
import { Stages } from './components/quiz/Stages.js';
import { stage } from './core/data.js';
import './core/Emitter.js'
import './core/data.js'
import { Emitter } from './core/Emitter.js';
import { NextStageButton } from './components/quiz/NextStageButton.js';

const quiz = new Quiz('#quiz-container', {
  components: [Stages, Player, Answers, NextStageButton],
})

quiz.render()



// [Info, Player, Asnwers],
