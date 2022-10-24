import {$} from "../../core/dom";
import {storage} from "../../core/utils";

export class ResultsPopUp extends HTMLElement {
    static className = 'results-popup'
    constructor() {
        super();

        const shadowDom = $(this.attachShadow({mode: 'open'}))

        const resultsWrapper = $
            .create('div', ResultsPopUp.className)
            .attr({part: 'popup'})
        const resultsList = $
            .create('div', ResultsPopUp.className + '__list')
            .attr({part: 'popup-list'})
        const resultItems = [].concat([{size: 'Game', moves: 'Moves', time: 'Time'}], storage('results'))
        resultItems.forEach(result => {
            const listItem = $
                .create('div', ResultsPopUp.className + '__list-item')
                .attr({part: 'popup-item'})
            Object.keys(result).forEach(key => {
                const el = $
                    .create('span')
                    .attr({part: key})
                    .text(result[key])
                listItem.append(el)
            })
            resultsList.append(listItem)
        })

        shadowDom.append(resultsWrapper)
        resultsWrapper.append(resultsList)
    }
}
