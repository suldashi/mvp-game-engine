const MainLoop = require("mainloop.js");
const PIXI = require("pixi.js");
const config = require("./config");
const Rectangle = require("./rectangle");
const PolygonRenderer = require("./polygon-renderer");
const Vec2 = require("./vec2");

const pixiApp = new PIXI.Application({width: config.screenWidth, height: config.screenHeight, antialias: true});
const graphics = new PIXI.Graphics();
pixiApp.stage.addChild(graphics);
const parentElement = document.getElementById(config.DOMContainerElement);
parentElement.appendChild(pixiApp.view);

let rectangle = new Rectangle(new Vec2(0,0), new Vec2(100,100));
let rectangleRenderer = new PolygonRenderer(graphics, rectangle);

let translationVector = new Vec2(200,150);  //pixels per second

MainLoop.setSimulationTimestep(config.timestep)
.setBegin(() => {
    //handle input here
}).setUpdate((delta) => {
    rectangle.translate(translationVector.scale(delta/1000));
}).setDraw(() => {
    graphics.clear();
    rectangleRenderer.update();
}).start();