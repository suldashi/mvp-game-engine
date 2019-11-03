const PlayerControlComponent = require("../component/player-control-component");

class UserControlSystem {
    constructor() {
        this.components = [];
        this.activeControls = {
            up: false,
            down: false,
            left: false,
            right: false
        }
        
        this.frameControls = {
            up: false,
            down: false,
            left: false,
            right: false
        }

        document.addEventListener('keydown', (ev) => {
            if(ev.code === "KeyW") {
                this.activeControls.up = true;
            }
            if(ev.code === "KeyS") {
                this.activeControls.down = true;
            }
            if(ev.code === "KeyA") {
                this.activeControls.left = true;
            }
            if(ev.code === "KeyD") {
                this.activeControls.right = true;
            }
        });
        
        document.addEventListener('keyup', (ev) => {
            if(ev.code === "KeyW") {
                this.activeControls.up = false;
            }
            if(ev.code === "KeyS") {
                this.activeControls.down = false;
            }
            if(ev.code === "KeyA") {
                this.activeControls.left = false;
            }
            if(ev.code === "KeyD") {
                this.activeControls.right = false;
            }
        });
    }

    createPlayerControlComponent(bodyComponent) {
        let playerControlComponent = new PlayerControlComponent(bodyComponent, this);
        this.components.push(playerControlComponent);
        return playerControlComponent;
    }

    getControls() {
        return this.frameControls;
    }

    update() {
        this.frameControls.up = this.activeControls.up;
        this.frameControls.down = this.activeControls.down;
        this.frameControls.left = this.activeControls.left;
        this.frameControls.right = this.activeControls.right;
        for(var i in this.components) {
            this.components[i].update();
        }
    }
}

module.exports = UserControlSystem;