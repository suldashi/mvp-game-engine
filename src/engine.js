const MainLoop = require("mainloop.js");
let ticksSinceStart = 0;
MainLoop.setUpdate(() => {
    console.log(ticksSinceStart++ + " ticks since the start of the engine.");
}).start();