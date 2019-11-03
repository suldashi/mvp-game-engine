const Vec2 = require("../vec2");

class PlayerControlComponent {
    constructor(bodyComponent, userControlSystem) {
        this.bodyComponent = bodyComponent;
        this.userControlSystem = userControlSystem;
    }

    update() {
        let controls = this.userControlSystem.getControls();
        let velocityVector = new Vec2((controls.right?200:0)+(controls.left?-200:0),(controls.down?200:0)+(controls.up?-200:0));
        this.bodyComponent.setVelocity(velocityVector);
    }
}

module.exports = PlayerControlComponent;