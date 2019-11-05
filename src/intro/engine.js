const MainLoop = require("mainloop.js");
const config = require("./config");
const Vec2 = require("./vec2");
const Entity = require("./entity");
const UserControlSystem = require("./system/user-control-system");
const GraphicsSystem = require("./system/graphics-system");
const PhysicsSystem = require("./system/physics-system");

//system instances
const userControlSystem = new UserControlSystem();
const graphicsSystem = new GraphicsSystem();
const physicsSystem = new PhysicsSystem();

//A player object, like all game objects, is an entity with components attached to it
let player = new Entity();
let rectangleBody = physicsSystem.createRectangleBodyComponent(new Vec2(0,0), new Vec2(100,100));
let playerRenderer = graphicsSystem.createPolygonRendererComponent(rectangleBody);
let playerController = userControlSystem.createPlayerControlComponent(rectangleBody);
player.attachComponent(rectangleBody);
player.attachComponent(playerRenderer);
player.attachComponent(playerController);

MainLoop.setSimulationTimestep(config.timestep)
.setBegin(() => {
    userControlSystem.update();
}).setUpdate((delta) => {
    let scaledDelta = delta/1000;
    physicsSystem.update(scaledDelta);
}).setDraw(() => {
    graphicsSystem.update();
}).start();