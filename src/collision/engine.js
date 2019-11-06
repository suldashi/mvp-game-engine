const MainLoop = require("mainloop.js");
const config = require("./config");
const Vec2 = require("./vec2");
const Entity = require("./entity");
const UserControlSystem = require("./system/user-control-system");
const GraphicsSystem = require("./system/graphics-system");
const PhysicsSystem = require("./system/physics-system");
const CollisionDetectionSystem = require("./system/collision-detection-system");

const userControlSystem = new UserControlSystem();
const graphicsSystem = new GraphicsSystem();
const physicsSystem = new PhysicsSystem();
const collisionDetectionSystem = new CollisionDetectionSystem();

let player = new Entity();
let rectangleBody = physicsSystem.createRectangleBodyComponent(new Vec2(100,100), new Vec2(200,200));
let playerRenderer = graphicsSystem.createPolygonRendererComponent(rectangleBody);
let playerController = userControlSystem.createPlayerControlComponent(rectangleBody);
let collisionDetector = collisionDetectionSystem.createCollisionDetectionComponent();
player.attachComponent(rectangleBody);
player.attachComponent(playerRenderer);
player.attachComponent(playerController);
player.attachComponent(collisionDetector);


MainLoop.setSimulationTimestep(config.timestep)
.setBegin(() => {
    userControlSystem.update();
}).setUpdate((delta) => {
    let scaledDelta = delta/1000;
    physicsSystem.update(scaledDelta);
    collisionDetectionSystem.update();
}).setDraw(() => {
    graphicsSystem.update();
}).start();