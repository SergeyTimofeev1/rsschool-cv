import {$} from "../../core/dom";
import {PuzzleComponent} from "../../core/PuzzleComponent";
import {capitalize, storage} from "../../core/utils";
import {Stopwatch} from "../Stopwatch";

export class PuzzleInfo extends PuzzleComponent {
    static className = 'puzzle-game__info'

    constructor($root, options) {
        super($root, {
            name: 'PuzzleInfo',
            ...options
        })
        this.savedMoves = storage('puzzle.moves') || 0
        this.moves = null
        this.time = null
    }

    render () {
        ['moves', 'time'].forEach(item => {
            const el = $
                .create('div', `${PuzzleInfo.className}-${item}`)
                .text(`${capitalize(item)}: `)
            const span = $
                .create('span')
                .data('id', item)
            this[item] = span
            this.$root.append(el)
            el.append(span)
            if (this.moves) {
                this.moves.text(this.savedMoves)
            }
            if (this.time) {
                this.stopwatch = new Stopwatch(this.time)
            }
        })
    }

    init() {
        super.init()

        this.$on('shuffle', this.resetPuzzleInfo.bind(this))
        this.$on('stopTimer', this.stopTimer.bind(this))
        this.$on('save', this.saveGame.bind(this))
        this.$on('madeMove', this.updateMoves.bind(this))
        this.$on('setSize', this.resetPuzzleInfo.bind(this))
    }

    resetPuzzleInfo () {
        this.stopwatch.reset()
        this.updateMoves(0)
    }

    stopTimer () {
        this.stopwatch.stop()
    }

    saveGame () {
        storage('puzzle.time', this.stopwatch.currentTime)
    }

    updateMoves (moves) {
        if ([1, this.savedMoves + 1].includes(moves)) {
            this.stopwatch.start()
        }
        const el = this.$root.find('[data-id="moves"]')
        el.text(moves)
    }
}
