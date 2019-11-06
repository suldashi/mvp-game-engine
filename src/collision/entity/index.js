const uuid = require("uuid").v4;

class Entity {
    constructor() {
        this.id = uuid();
        this.components = [];
    }

    attachComponent(component) {
        this.components.push(component);
    }
}

module.exports = Entity;