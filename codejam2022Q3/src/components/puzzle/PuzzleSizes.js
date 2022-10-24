import {$} from "../../core/dom";
import {PuzzleComponent} from "../../core/PuzzleComponent";
import {Button} from "../shared/Button";

export class PuzzleSizes extends PuzzleComponent {
    static className = 'puzzle-game__sizes'

    constructor($root, options) {
        super($root, {
            name: 'PuzzleSizes',
            listeners: ['click'],
            ...options
        })
        this.size = options.size
        this.availableSizes = [3, 4, 5, 6, 7, 8]
    }

    get currentSizeText () {
        return `Frame size: ${getSizeText(this.size)}`
    }

    render () {
        // TODO: Refactor rendering
        this.currentSizeBlock = $
            .create('div', PuzzleSizes.className + '-current')
            .text(this.currentSizeText)
        const otherSizes = $.create('div', PuzzleSizes.className + '-other')
        const otherSizesText = $
            .create('div', 'sizes-text')
            .text('Other sizes:')
        const otherSizesButtons = $.create('div', 'sizes-buttons')
        this.availableSizes.map(size => {
            const el = $
                .create('button')
                .data('size', size)
                .attr(size === Number(this.size) ? {disabled: ''} : {})
            const button = new Button(el, { content: getSizeText(size), classes: 'sizes-buttons__item' })
            otherSizesButtons.append(el)
        })
        this.$root.append(this.currentSizeBlock, otherSizes)
        otherSizes.append(otherSizesText, otherSizesButtons)
    }

    onClick (event) {
        const btn = $(event.target)?.closest('button')
        if (btn) {
            const size = btn.data('size')
            if (size !== this.size) {
                this.$emit('setSize', size)
                this.size = size
                this.currentSizeBlock.text(this.currentSizeText)
                const disabledBtn = this.$root.find('button[disabled=""]')
                if (disabledBtn) { disabledBtn.attr('disabled') }
                btn.attr({disabled: ''})
            }
        }
    }
}

function getSizeText (size) {
    return `${size}x${size}`
}
