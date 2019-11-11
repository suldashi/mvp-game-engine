const MainLoop = require("mainloop.js");
const PIXI = require("pixi.js");

let pixiApp = new PIXI.Application();
let pixiContainer = document.getElementById("pixi-container");
let pixiGraphics = new PIXI.Graphics();
pixiGraphics.beginFill(0x00FF00);
pixiGraphics.drawPolygon([50,50,200,50,50,200]);
pixiGraphics.endFill();
pixiApp.stage.addChild(pixiGraphics);
pixiContainer.appendChild(pixiApp.view);

let loopCounter = 0;

MainLoop.setUpdate(() => {
    console.log("The game loop has been executed " + loopCounter + " times.");
    loopCounter++;
}).start();