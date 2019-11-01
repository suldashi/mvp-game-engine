const MainLoop = require("mainloop.js");
const PIXI = require("pixi.js");
const config = require("./config");

const pixiApp = new PIXI.Application({width: config.screenWidth, height: config.screenHeight});
const parentElement = document.getElementById("root");
parentElement.appendChild(pixiApp.view);

MainLoop.setSimulationTimestep(config.timestep)
.setBegin(() => {
    //handle input here
}).setUpdate((delta) => {
    console.log(delta);
}).setDraw(() => {
    //handle drawing here
}).start();