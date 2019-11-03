const PIXI = require("pixi.js");

const config = require("../config");
const PolygonRendererComponent = require("../component/polygon-renderer-component");

class GraphicsSystem {
    constructor() {
        PIXI.utils.skipHello();
        this.pixiApp = new PIXI.Application({width: config.screenWidth, height: config.screenHeight, antialias: true});
        this.graphics = new PIXI.Graphics();
        this.pixiApp.stage.addChild(this.graphics);
        this.parentElement = document.getElementById(config.DOMContainerElement);
        this.parentElement.appendChild(this.pixiApp.view);
        this.components = [];
    }

    createPolygonRendererComponent(polygon) {
        let polygonRendererComponent = new PolygonRendererComponent(this.graphics, polygon);
        this.components.push(polygonRendererComponent);
        return polygonRendererComponent;
    }

    update() {
        this.graphics.clear();
        for(var i in this.components) {
            this.components[i].update();
        }
    }
}

module.exports = GraphicsSystem;