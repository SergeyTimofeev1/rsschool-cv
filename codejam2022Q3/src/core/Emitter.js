export class Emitter {
    constructor() {
        this.listeners = {}
    }

    emit (eventType, ...args) {
        if (!Array.isArray(this.listeners[eventType])) { return false }
        this.listeners[eventType].forEach(listener => listener(...args))
        return true
    }

    subscribe (eventType, fn) {
        this.listeners[eventType] = this.listeners[eventType] || []
        this.listeners[eventType].push(fn)
        return () => {
            this.listeners[eventType] = this.listeners[eventType].filter(listener => listener !== fn)
        }
    }
}
