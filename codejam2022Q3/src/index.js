import {Puzzle} from "./components/puzzle/Puzzle";
import {PuzzleGameWrapper} from "./components/puzzle/PuzzleGameWrapper";
import "./index.scss";

const puzzle = new Puzzle('app', {
    components: [PuzzleGameWrapper]
})
puzzle.render()
