import { $ } from "../../core/dom";
import { isEmpty, storage } from "../../core/utils";
import { PuzzleComponent } from "../../core/PuzzleComponent";
import { ResultsPopUp } from "../modals/ResultsPopUp";

export class PuzzleGame extends PuzzleComponent {
  static className = "puzzle-game";

  constructor($root, options) {
    super($root, {
      name: "PuzzleGame",
      listeners: ["mousedown", "click", "dragstart", "dragover", "dragenter", "dragend", "drop"],
      ...options,
    });
    this.savedFlatMatrix = storage("puzzle.list") || [];
    this.matrix = [];
    this.size = options.size;
    this.moves = storage("puzzle.moves") || 0;
    this.gameDisabled = false;

    customElements.define("results-popup", ResultsPopUp);
  }

  get puzzleLength() {
    return Math.pow(this.size, 2);
  }

  get flatMatrix() {
    return Array.from({ length: this.puzzleLength }, (_, i) => ++i);
  }

  get referenceFlatMatrix() {
    return chunk(this.flatMatrix, this.size).flat();
  }

  render() {
    this.generatePuzzleGame();
  }

  init() {
    super.init();

    this.$on("setSize", this.resetGame.bind(this));
    this.$on("shuffle", this.resetGame.bind(this));
    this.$on("save", this.saveGame.bind(this));
  }

  resetGame(size = null) {
    if (this.gameDisabled) {
      this.toggleGameShutdown();
    }
    this.size = size ? size : this.size;
    this.moves = 0;
    this.savedFlatMatrix = [];
    this.generatePuzzleGame();
  }

  saveGame() {
    ["size", "moves"].forEach((item) => storage(`puzzle.${item}`, this[item]));
    storage("puzzle.list", this.matrix.flat());
  }

  generatePuzzleGame() {
    this.$root.html("");
    const flatMatrix = this.getFlatShuffledMatrix();
    this.matrix = chunk(flatMatrix, this.size);
    flatMatrix.forEach((item) => {
      const el = $.create("div", ...this.getPuzzleItemClasses(item))
        .text(item)
        .data("id", item)
        .style(this.setPuzzleItemStyle(item));
      this.$root.append(el);
    });

    this.$root.append($.create("results-popup"));
  }

  getFlatShuffledMatrix() {
    if (!isEmpty(this.savedFlatMatrix)) {
      return this.savedFlatMatrix;
    }
    // return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 16, 15]; //! 4x4 для проверки, при необходимости можно вернуть массивы размером 3х3 4х4 5х5 итд, для быстрой проверки сохранений результата
    return shuffle(this.flatMatrix);
  }

  getPuzzleItemClasses(item) {
    return [`${PuzzleGame.className}__item`, item === this.puzzleLength ? "is-empty" : ""].filter(Boolean);
  }

  setPuzzleItemStyle(item) {
    const { x, y } = this.getMatrixItemIndex(item);
    const itemWidthAndHeight = (100 / this.size).toFixed(2) + "%";
    return {
      width: itemWidthAndHeight,
      height: itemWidthAndHeight,
      transform: `translate3D(${x * 100}%, ${y * 100}%, 0)`,
    };
  }

  getMatrixItemIndex(value) {
    return this.matrix.reduce((result, ch, idx) => {
      if (ch.includes(value)) {
        result.x = idx;
        result.y = ch.findIndex((i) => i === value);
      }
      return result;
    }, {});
  }

  toggleValidToSwapPuzzle(target) {
    if (target) {
      const itemNumber = Number(target.data("id"));
      if (this.isValidToSwap(itemNumber)) {
        // target.attr({draggable: true})
        this.validToSwapPuzzle = target;
        return;
      }
    }
    if (this.validToSwapPuzzle) {
      this.validToSwapPuzzle.attr("draggable");
      this.validToSwapPuzzle = null;
    }
  }

  isValidToSwap(itemNumber) {
    const c1 = this.getMatrixItemIndex(itemNumber);
    const c2 = this.getMatrixItemIndex(this.puzzleLength);
    return (c1.x === c2.x || c1.y === c2.y) && (Math.abs(c1.x - c2.x) === 1 || Math.abs(c1.y - c2.y) === 1);
  }

  updateMatrix(itemNumber) {
    const c1 = this.getMatrixItemIndex(itemNumber);
    const c2 = this.getMatrixItemIndex(this.puzzleLength);
    this.matrix[c1.x][c1.y] = this.matrix[c2.x].splice(c2.y, 1, this.matrix[c1.x][c1.y])[0];
    // const allItems = this.$root.findAll('.puzzle-game__item')
  }

  checkWinner() {
    if (JSON.stringify(this.matrix.flat()) === JSON.stringify(this.referenceFlatMatrix)) {
      this.$emit("winner", { size: this.size, moves: this.moves });
      this.toggleGameShutdown();
    }
  }

  toggleGameShutdown() {
    this.gameDisabled = !this.gameDisabled;
    this.$root.toggle("disabled");
  }

  onMousedown(event) {
    // console.log('onMousedown')
    this.toggleValidToSwapPuzzle($(event.target));
  }

  // onMouseup (event) {
  //     console.log('onMouseup')
  //     this.toggleValidToSwapPuzzle()
  // }

  onClick(event) {
    if (this.validToSwapPuzzle) {
      this.updateMatrix(Number(this.validToSwapPuzzle.data("id")));
      const blankItem = this.$root.find(`[data-id="${this.puzzleLength}"]`);
      blankItem.swapWith(this.validToSwapPuzzle);
      this.moves += 1;
      this.$emit("madeMove", this.moves);
      this.checkWinner();
    }
    // this.toggleValidToSwapPuzzle()
  }

  onDragstart(event) {
    console.log({ event });
    event.dataTransfer.dropEffect = "move";
    // event.preventDefault()
    // const target = $(event.target).add('is-empty')
  }

  onDragend(event) {
    console.log({ onDragend: event });
    // event.preventDefault()
    // const target = $(event.target).add('is-empty')
  }

  onDragover(event) {
    // console.log({onDragend: event})
    event.preventDefault();
    // const target = $(event.target).add('is-empty')
  }

  onDragenter(event) {
    // console.log({onDragend: event})
    event.preventDefault();
    // const target = $(event.target).add('is-empty')
  }

  onDrop(event) {
    console.log({ onDrop: event });
    // event.preventDefault()
    // if (this.validToSwapPuzzle) {
    //     const blankItem = this.$root.find(`[data-id="${this.puzzleLength}"]`)
    //     blankItem.swapWith(this.validToSwapPuzzle)
    //     this.matrix = this.updateMatrix(Number(this.validToSwapPuzzle.data('id')))
    // }
    // this.toggleValidToSwapPuzzle()
    // const target = $(event.target).add('is-empty')
  }
}

function shuffle(arr) {
  return arr.sort(() => 0.5 - Math.random());
}

function chunk(arr, chunkSize) {
  return arr.reduce((all, one, idx) => {
    const ch = Math.floor(idx % chunkSize);
    all[ch] = [].concat(all[ch] || [], one);
    return all;
  }, []);
}
