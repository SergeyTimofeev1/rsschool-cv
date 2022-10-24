import {DomListener} from "./DomListener";

export class PuzzleComponent extends DomListener {
    constructor($root, options = {}) {
        super($root, options.listeners);
        this.name = options.name || ''
        this.emitter = options.emitter
        this.unsubscribers = []
    }

    init () {
        this.render()
        this.initDomListeners()
    }

    $emit (eventType, ...args) {
        this.emitter.emit(eventType, ...args)
    }

    $on (eventType, fn) {
        const unsub= this.emitter.subscribe(eventType, fn)
        this.unsubscribers.push(unsub)
    }

}
