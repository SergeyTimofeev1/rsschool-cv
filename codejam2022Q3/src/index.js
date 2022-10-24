// TODO проверка на выигрыш и вывод сообщения типа "Ура ты выиграл за n ходов и n времени"
// TODO Драг н дроп

import { Puzzle } from "./components/puzzle/Puzzle";
import { PuzzleGameWrapper } from "./components/puzzle/PuzzleGameWrapper";
import "./index.scss";

const puzzle = new Puzzle("app", {
  components: [PuzzleGameWrapper],
});
puzzle.render();
