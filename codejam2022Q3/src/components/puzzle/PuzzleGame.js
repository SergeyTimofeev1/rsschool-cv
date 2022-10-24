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
    customElements.define("results-popup", ResultsPopUp);
  }

  get puzzleLength() {
    return Math.pow(this.size, 2);
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
    this.size = size ? size : this.size;
    this.moves = 0;
    this.savedFlatMatrix = [];
    this.generatePuzzleGame();
  }

  saveGame() {
    ["size", "moves"].forEach((item) => storage(`puzzle.${item}`, this[item]));
    storage("puzzle.list", this.matrix.flat());
    storage("results", [
      { size: this.size, moves: this.moves, time: new Date() },
      { size: this.size, moves: this.moves, time: new Date() },
      { size: this.size, moves: this.moves, time: new Date() },
      { size: this.size, moves: this.moves, time: new Date() },
      { size: this.size, moves: this.moves, time: new Date() },
      { size: this.size, moves: this.moves, time: new Date() },
    ]);
  }

  generatePuzzleGame() {
    this.$root.html("");
    const flatMatrix = this.getFlatMatrix();
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

  getFlatMatrix() {
    if (!isEmpty(this.savedFlatMatrix)) {
      return this.savedFlatMatrix;
    }
    const list = Array.from({ length: this.puzzleLength }, (_, i) => ++i);
    return shuffle(list);
  }

  getPuzzleItemClasses(item) {
    return [`${PuzzleGame.className}__item`, item === this.puzzleLength ? "is-empty" : ""].filter(Boolean);
  }

  setPuzzleItemStyle(item) {
    const { x, y } = this.getItemCoords(item);
    const itemWidthAndHeight = (100 / this.size).toFixed(2) + "%";
    return {
      width: itemWidthAndHeight,
      height: itemWidthAndHeight,
      transform: `translate3D(${x * 100}%, ${y * 100}%, 0)`,
    };
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
    const c1 = this.getItemCoords(itemNumber);
    const c2 = this.getItemCoords(this.puzzleLength);
    return (c1.x === c2.x || c1.y === c2.y) && (Math.abs(c1.x - c2.x) === 1 || Math.abs(c1.y - c2.y) === 1);
  }

  getItemCoords(itemNumber) {
    return this.matrix.reduce((coords, item, idx) => {
      if (item.includes(itemNumber)) {
        coords.x = idx;
        coords.y = getIndex(item, itemNumber);
      }
      return coords;
    }, {});
  }

  updateMatrix(itemNumber) {
    const arr = this.matrix.flat();
    const c1 = getIndex(arr, itemNumber);
    const c2 = getIndex(arr, this.puzzleLength);
    arr[c1] = arr.splice(c2, 1, arr[c1])[0];
    return chunk(arr, this.size);
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
      const blankItem = this.$root.find(`[data-id="${this.puzzleLength}"]`);
      blankItem.swapWith(this.validToSwapPuzzle);
      this.matrix = this.updateMatrix(Number(this.validToSwapPuzzle.data("id")));
      this.moves += 1;
      this.$emit("madeMove", this.moves);
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
    if (this.validToSwapPuzzle) {
      const blankItem = this.$root.find(`[data-id="${this.puzzleLength}"]`);
      blankItem.swapWith(this.validToSwapPuzzle);
      this.matrix = this.updateMatrix(Number(this.validToSwapPuzzle.data("id")));
    }
    this.toggleValidToSwapPuzzle();
    // const target = $(event.target).add('is-empty')
  }
}

function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

function chunk(arr, chunkSize) {
  return arr.reduce((all, one, idx) => {
    const ch = Math.floor(idx / chunkSize);
    all[ch] = [].concat(all[ch] || [], one);
    return all;
  }, []);
}

function getIndex(arr, value) {
  return arr.findIndex((item) => item === value);
}
