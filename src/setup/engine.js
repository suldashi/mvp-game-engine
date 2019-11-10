const MainLoop = require("mainloop.js");

let loopCounter = 0;

MainLoop.setUpdate(() => {
    console.log("The game loop has been executed " + loopCounter + " times.");
    loopCounter++;
}).start();