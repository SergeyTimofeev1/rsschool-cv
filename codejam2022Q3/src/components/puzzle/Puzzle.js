import {$} from "../../core/dom";
import {Emitter} from "../../core/Emitter";

export class Puzzle {
    static className = 'gem-puzzle'

    constructor(selector, options = {}) {
        this.$el = selector
        this.components = options.components || []
    }

    getRoot () {
        const $root = $.create('div', Puzzle.className)
        const componentOptions = {
            emitter: new Emitter()
        }
        this.components = this.components.map(Component => {
            const el = $.create('div', Component.className)
            const component = new Component(el, componentOptions)
            $root.append(el)
            return component
        })
        return $root
    }

    render () {
        this.$el = $
            .create('div')
            .attr({id: this.$el})
        $('body').append(this.$el)
        this.$el.append(this.getRoot())

        this.components.forEach(component => component.init())
    }
}
