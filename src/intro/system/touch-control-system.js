const config = require("../config");

class TouchControlSystem {
    constructor() {        
        this.controls = {
            up: false,
            down: false,
            left: false,
            right: false
        }

        this.backgroundSize = 50;
        this.containerSize = 100;
        this.controlLimit = 20;
        this.currentAngleNr = -1;

        this.controlElement = document.createElement("div");
        this.controlElement.className = "control-large";
        let rootElement = document.getElementById(config.DOMContainerElementID);
        rootElement.appendChild(this.controlElement);

        this.touchHandler = (e) => {
            e.stopPropagation();
            e.preventDefault();
            let touch = e.changedTouches[0];
            let touchX = touch.clientX-this.controlElement.offsetLeft;
            let touchY = touch.clientY-this.controlElement.offsetTop;
            let nX = touchX - this.containerSize/2;
            let nY = touchY - this.containerSize/2;
            if(nX*nX+nY*nY>this.controlLimit) {
                nX = this.controlLimit*nX/Math.sqrt(nX*nX+nY*nY);
                nY = this.controlLimit*nY/Math.sqrt(nX*nX+nY*nY);
            }
            this.controlElement.style.backgroundPosition = `${nX+this.backgroundSize/2}px ${nY+this.backgroundSize/2}px`;
            let offset = Math.PI/8;
            let angle = -Math.atan2(nY,nX);
            if(angle<0) {
                angle+=Math.PI*2;
            }
            if((angle<=0+offset && angle>0) || (angle<=Math.PI*2 && angle>=Math.PI*2-offset)) {
                let angleNr = 0;
                if(this.currentAngleNr!==angleNr) {
                    this.currentAngleNr = angleNr;
                    this.controls.up = this.controls.down = this.controls.left = false;
                    this.controls.right = true;
                }
                
            }
            else if(angle<=Math.PI/4+offset && angle>=Math.PI/4-offset) {
                let angleNr = 1;
                if(this.currentAngleNr!==angleNr) {
                    this.currentAngleNr = angleNr;
                    this.controls.down = this.controls.left = false;
                    this.controls.up = this.controls.right = true;
                }
            }
            else if(angle<=Math.PI/2+offset && angle>=Math.PI/2-offset) {
                let angleNr = 2;
                if(this.currentAngleNr!==angleNr) {
                    this.currentAngleNr = angleNr;
                    this.controls.right = this.controls.down = this.controls.left = false;
                    this.controls.up =  true;
                }
            }
            else if(angle<=3*Math.PI/4+offset && angle>=3*Math.PI/4-offset) {
                let angleNr = 3;
                if(this.currentAngleNr!==angleNr) {
                    this.currentAngleNr = angleNr;
                    this.controls.right = this.controls.down = false;
                    this.controls.left = this.controls.up =  true;
                }
            }
            else if(angle<=Math.PI+offset && angle>=Math.PI-offset) {
                let angleNr = 4;
                if(this.currentAngleNr!==angleNr) {
                    this.currentAngleNr = angleNr;
                    this.controls.up = this.controls.right = this.controls.down = false;
                    this.controls.left = true;
                }
            }
            else if(angle<=5*Math.PI/4+offset && angle>=5*Math.PI/4-offset) {
                let angleNr = 5;
                if(this.currentAngleNr!==angleNr) {
                    this.currentAngleNr = angleNr;
                    this.controls.up = this.controls.right = false;
                    this.controls.down = this.controls.left = true;
                }
            }
            else if(angle<=6*Math.PI/4+offset && angle>=6*Math.PI/4-offset) {
                let angleNr = 6;
                if(this.currentAngleNr!==angleNr) {
                    this.currentAngleNr = angleNr;
                    this.controls.left = this.controls.up = this.controls.right = false;
                    this.controls.down = true;
                }
            }
            else {
                let angleNr = 7;
                if(this.currentAngleNr!==angleNr) {
                    this.currentAngleNr = angleNr;
                    this.controls.left = this.controls.up = false;
                    this.controls.right = this.controls.down = true;
                }
            }
        };

        this.controlElement.ontouchstart = this.touchHandler;
        this.controlElement.ontouchmove = this.touchHandler;

        this.controlElement.ontouchend = (e) => {
            this.controlElement.style.backgroundPosition = `${this.containerSize/2-this.backgroundSize/2}px ${this.containerSize/2-this.backgroundSize/2}px`;
            this.controls.up = this.controls.down = this.controls.left = this.controls.right = false;
        }

    }

    getControls() {
        return this.controls;
    }
}

module.exports = TouchControlSystem;