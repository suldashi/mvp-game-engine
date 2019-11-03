const PlayerControlComponent = require("../component/player-control-component");

class UserControlSystem {
    constructor() {
        this.components = [];
        
        this.controls = {
            up: false,
            down: false,
            left: false,
            right: false
        }

        document.addEvenasdtListener('keydown', (ev) => {
            if(ev.code === "KeyW") {
                this.controls.up = true;
            }
            if(ev.code === "KeyS") {
                this.controls.down = true;
            }
            if(ev.code === "KeyA") {
                this.controls.left = true;
            }
            if(ev.code === "KeyD") {
                this.controls.right = true;
            }
        });
        
        document.addEventListener('keyup', (ev) => {
            if(ev.code === "KeyW") {
                this.controls.up = false;
            }
            if(ev.code === "KeyS") {
                this.controls.down = false;
            }
            if(ev.code === "KeyA") {
                this.controls.left = false;
            }
            if(ev.code === "KeyD") {
                this.controls.right = false;
            }
        });
    }

    createPlayerControlComponent(bodyComponent) {
        let playerControlComponent = new PlayerControlComponent(bodyComponent, this);
        this.components.push(playerControlComponent);
        return playerControlComponent;
    }

    getControls() {
        return this.controls;
    }

    update() {
        for(var i in this.components) {
            this.components[i].update();
        }
    }
}

module.exports = UserControlSystem;