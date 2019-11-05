const MainLoop = require("mainloop.js");
const config = require("./config");
const Vec2 = require("./vec2");
const Entity = require("./entity");
const GraphicsSystem = require("./system/graphics-system");
const PhysicsSystem = require("./system/physics-system");
const TimerSystem = require("./system/timer-system");

//system instances
const graphicsSystem = new GraphicsSystem();
const physicsSystem = new PhysicsSystem();
const timerSystem = new TimerSystem();

//A player object, like all game objects, is an entity with components attached to it
let player = new Entity();
let rectangleBody = physicsSystem.createRectangleBodyComponent(new Vec2(200,200), new Vec2(300,300));
let playerRenderer = graphicsSystem.createPolygonRendererComponent(rectangleBody);
let movementTimer = timerSystem.createTimerComponent();
movementTimer.addTask(250,() => {
    rectangleBody.setVelocity(new Vec2(100,0));
});
movementTimer.addTask(250,() => {
    rectangleBody.setVelocity(new Vec2(0,100));
});
movementTimer.addTask(250,() => {
    rectangleBody.setVelocity(new Vec2(-100,0));
});
movementTimer.addTask(250,() => {
    rectangleBody.setVelocity(new Vec2(0,-100));
});
movementTimer.startAndRepeat();
player.attachComponent(movementTimer);
player.attachComponent(rectangleBody);
player.attachComponent(playerRenderer);


MainLoop.setSimulationTimestep(config.timestep)
.setBegin(() => {

}).setUpdate((delta) => {
    let scaledDelta = delta/1000;
    timerSystem.update(delta);
    physicsSystem.update(scaledDelta);
}).setDraw(() => {
    graphicsSystem.update();
}).start();