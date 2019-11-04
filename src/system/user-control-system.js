const PlayerControlComponent = require("../component/player-control-component");
const KeyboardControlSystem = require("./keyboard-control-system");
const TouchControlSystem = require("./touch-control-system");

class UserControlSystem {
    constructor() {
        this.components = [];
        this.keyboardControlSystem = new KeyboardControlSystem();
        this.touchControlSystem = new TouchControlSystem();

        this.controls = {
            up: false,
            down: false,
            left: false,
            right: false
        }
    }

    createPlayerControlComponent(bodyComponent) {
        let playerControlComponent = new PlayerControlComponent(bodyComponent, this);
        this.components.push(playerControlComponent);
        return playerControlComponent;
    }

    getControls() {
        const keyboardControls = this.keyboardControlSystem.getControls();
        const touchControls = this.touchControlSystem.getControls();
        this.controls.up = keyboardControls.up | touchControls.up;
        this.controls.down = keyboardControls.down | touchControls.down;
        this.controls.left = keyboardControls.left | touchControls.left;
        this.controls.right = keyboardControls.right | touchControls.right;
        return this.controls;
    }

    update() {
        for(var i in this.components) {
            this.components[i].update();
        }
    }
}

module.exports = UserControlSystem;