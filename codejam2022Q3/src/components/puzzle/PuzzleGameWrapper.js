import {$} from "../../core/dom";
import {storage} from "../../core/utils";
import {PuzzleMenu} from "./PuzzleMenu";
import {PuzzleInfo} from "./PuzzleInfo";
import {PuzzleGame} from "./PuzzleGame";
import {PuzzleSizes} from "./PuzzleSizes";

export class PuzzleGameWrapper {
    static className = 'puzzle-game__wrapper'

    constructor($root, options) {
        this.$root = $root
        this.components = []
        this.emitter = options.emitter
        this.size = storage('puzzle.size') || 4
    }

    render () {
        const componentOptions = {
            emitter: this.emitter,
            size: this.size
        }
        this.components = [PuzzleMenu, PuzzleInfo, PuzzleGame, PuzzleSizes].map(Component => {
            const el = $.create('div', Component.className)
            const component = new Component(el, componentOptions)
            this.$root.append(el)
            return component
        })
    }

    init () {
        this.render()
        this.components.forEach(component => component.init())
    }
}
