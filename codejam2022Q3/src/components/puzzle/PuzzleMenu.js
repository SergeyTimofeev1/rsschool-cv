import { $ } from "../../core/dom";
import { PuzzleComponent } from "../../core/PuzzleComponent";
import { Button } from "../shared/Button";
import { capitalize } from "../../core/utils";

export class PuzzleMenu extends PuzzleComponent {
  static className = "puzzle-game__menu";

  constructor($root, options) {
    super($root, {
      name: "PuzzleMenu",
      listeners: ["click"],
      ...options,
    });
  }

  get menuButtons() {
    return [
      { id: "shuffle", content: "Shuffle & Start" },
      { id: "stop", content: "Stop" },
      { id: "save", content: "Save" },
      { id: "results", content: "Results" },
    ];
  }

  render() {
    this.menuButtons.map((button) => {
      const options = {
        classes: [`${button.id}-btn`],
        ...button,
      };
      const el = $.create("button").data("id", button.id);
      button = new Button(el, options);
      this.$root.append(el);
      return button;
    });
  }

  onClick(event) {
    const btn = $(event.target)?.closest("button");
    if (btn) {
      const methodName = `on${capitalize(btn.data("id"))}`;
      this[methodName]();
    }
  }

  onShuffle() {
    this.$emit("shuffle");
  }

  onStop() {
    this.$emit("stopTimer");
  }

  onSave() {
    this.$emit("save");
  }

  onResults() {
    this.$emit("results");
  }
}
