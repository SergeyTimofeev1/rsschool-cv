// Приложение

import { Quiz } from './components/quiz/Quiz.js';
import { Player } from './components/quiz/Player.js';
import { Answers } from './components/quiz/Answers.js';
import { Stages } from './components/quiz/Stages.js';
import './core/Emitter.js'
import './core/data.js'
import { NextStageButton } from './components/quiz/NextStageButton.js';
import { ResultButton } from './components/quiz/ResultButton.js';

const quiz = new Quiz('#quiz-container', {
  components: [Stages, Player, Answers, NextStageButton, ResultButton],
})

quiz.render()



