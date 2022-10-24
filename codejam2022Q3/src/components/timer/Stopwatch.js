import {humanReadableTime, isEmpty, storage} from "../../core/utils";

export class Stopwatch {
    constructor ($root) {
        this.$root = $root
        this.interval = null
        this.savedTime = storage('puzzle.time') || {}
        this.seconds = 0
        this.minutes = 0
        this.hours = 0

        this.render()
    }

    get currentTime () {
        if (!isEmpty(this.savedTime)) {
            const savedTime = {...this.savedTime}
            this.savedTime = {}
            return savedTime
        }
        return {h: this.hours, m: this.minutes, s: this.seconds}
    }

    render () {
        const {timeObj, time} = humanReadableTime(this.currentTime);
        ({h: this.hours, m: this.minutes, s: this.seconds} = timeObj)
        this.$root.text(time)
    }

    start () {
        if (!this.interval) {
            this.interval = setInterval(this.update.bind(this), 1000)
        }
    }

    stop () {
        if (this.interval) {
            clearInterval(this.interval)
            this.interval = null
        }
    }

    reset () {
        this.stop();
        [this.seconds, this.minutes, this.hours] = [0, 0, 0]
        this.render()
    }

    update () {
        this.seconds += 1
        this.render()
    }
}
