class KeyboardControlSystem {
    constructor() {        
        this.controls = {
            up: false,
            down: false,
            left: false,
            right: false
        }

        document.addEventListener('keydown', (ev) => {
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

    getControls() {
        return this.controls;
    }
}

module.exports = KeyboardControlSystem;