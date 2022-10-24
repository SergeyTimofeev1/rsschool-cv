import {$} from "../../core/dom";
import {storage} from "../../core/utils";

export class PopUp {
    static className = 'popup'
    constructor($root) {
        this.$root = $root

        this.prepare()
    }

    prepare () {
        this.wrapper = $.create('div', PopUp.className + '__wrapper')
        this.$root.append(this.wrapper)
        const resultsList = $.create('div', PopUp.className + '__list')
        const resultItems = [].concat([{size: 'Game', moves: 'Moves', time: 'Time'}], storage('results'))
        resultItems.forEach(result => {
            const listItem = $.create('div', PopUp.className + '__list-item')
            Object.keys(result).forEach(key => {
                const el = $
                    .create('span')
                    .text(result[key])
                listItem.append(el)
            })
            resultsList.append(listItem)
        })

        this.wrapper.append(resultsList)
    }

    toggle () {
        // const resultsList = $
        //     .create('div', PopUp.className + '__list')
        //     .attr({part: 'popup-list'})
        // const resultItems = [].concat([{size: 'Game', moves: 'Moves', time: 'Time'}], storage('results'))
        // resultItems.forEach(result => {
        //     const listItem = $
        //         .create('div', PopUp.className + '__list-item')
        //         .attr({part: 'popup-item'})
        //     Object.keys(result).forEach(key => {
        //         const el = $
        //             .create('span')
        //             .attr({part: key})
        //             .text(result[key])
        //         listItem.append(el)
        //     })
        //     resultsList.append(listItem)
        // })
        //
        // this.wrapper.append(resultsList)
        this.$root.toggle('is-opened')
    }
}
