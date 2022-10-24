import {capitalize} from "./utils";

export class DomListener {
    constructor($root, listeners = []) {
        if (!$root) {
            throw new Error('The DomListener is not provided with $root')
        }
        this.$root = $root
        this.listeners = listeners
    }

    initDomListeners () {
        this.listeners.forEach(listener => {
            const method = getMethodName(listener)
            if (!this[method]) {
                const name = this.name || ''
                throw new Error(`${method} method is not defined in ${name} Component`)
            }
            this[method] = this[method].bind(this)
            this.$root.on(listener, this[method])
        })
    }
}

function getMethodName (eventType) {
    if (typeof eventType !== 'string') { return '' }
    eventType = capitalize(eventType)
    return `on${eventType}`
}
