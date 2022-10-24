export class Button {
    static className = 'pg-button'

    constructor($root, options = {}) {
        this.$root = $root
        this.content = options.content || ''
        this.classes = options.classes || []

        this.prepare()
    }

    prepare () {
        this.$root
            .add(Button.className, this.classes)
            .text(this.content)
    }
}
