import {isEmpty} from "./utils";

class Dom {
    constructor (selector) {
        this.$el = typeof selector === 'string'
            ? document.querySelector(selector)
            : selector
    }

    add (...classes) {
        if (!isEmpty(classes)) {
            this.$el.classList.add(...classes.flat())
            return this
        }
    }

    append (...nodeList) {
        nodeList = nodeList.map(node => node instanceof Dom? node.$el : node)
        Document.prototype.append
            ? this.$el.append(...nodeList)
            : nodeList.forEach(node => this.$el.appendChild(node))

        return this
    }

    attr (attributes) {
        if (!attributes) {
            const attrs = Array.from(this.$el.attributes)
            return attrs.reduce((result, attr) => {
                result[attr.name] = attr.value
                return result
            }, {})
        }
        if (typeof attributes === 'object') {
            Object.keys(attributes).forEach(key => this.$el.setAttribute(key, attributes[key]))
            return this
        }
        if (typeof attributes === 'string') {
            this.$el.removeAttribute(attributes)
            return this
        }
    }

    closest (selector) {
        const closest = this.$el.closest(selector)
        return closest && $(closest)
    }

    data (key, value) {
        if (value) {
            this.$el.dataset[key] = value
            return this
        }

        return this.$el.dataset[key]
    }

    find (selector) {
        const elem = this.$el.querySelector(selector)
        return elem ? $(elem) : null
    }

    findAll (selector) {
        const all = this.$el.querySelectorAll(selector)
        return all.map(elem => $(elem))
    }

    html (html) {
        if (typeof html === 'string') {
            this.$el.innerHTML = html
            return this
        }

        return this.$el.outerHTML.trim()
    }

    on (eventType, callback) {
        this.$el.addEventListener(eventType, callback)
    }

    style (styles) {
        if (typeof styles === 'object') {
            Object.assign(this.$el.style, styles)
            return this
        }
        if (typeof styles === 'string') {
            return this.$el.style[styles]
        }
    }

    swapWith (node) {
        if (node instanceof Dom) {
            node = node.$el
        }
        [this.$el.style.transform, node.style.transform] = [node.style.transform, this.$el.style.transform]
    }

    text (text) {
        if (['string', 'number'].includes(typeof text)) {
            text = text.toString()
            this.$el.textContent = text
            return this
        }

        return this.$el.textContent.trim()
    }
}

export function $ (selector) {
    return new Dom(selector)
}

$.create = (tagName, ...classes) => {
    const el = $(document.createElement(tagName))
    if (!isEmpty(classes)) {
        el.add(classes)
    }
    return el
}
