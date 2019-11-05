const RectangleBodyComponent = require("../component/rectangle-body-component");

class PhysicsSystem {
    constructor() {
        this.components = [];
    }

    createRectangleBodyComponent(topLeft, bottomRight) {
        let rectangleBody = new RectangleBodyComponent(topLeft, bottomRight);
        this.components.push(rectangleBody);
        return rectangleBody;
    }

    update(delta) {
        for(var i in this.components) {
            this.components[i].update(delta);
        }
    }
}

module.exports = PhysicsSystem;