export class BasePlugin {
    constructor(options = {}) {
        this.options = options;
    }

    initialize() {
        // Override in child classes
    }

    execute() {
        // Override in child classes
    }

    cleanup() {
        // Override in child classes
    }
}