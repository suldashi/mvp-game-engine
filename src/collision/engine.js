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
let collisionDetector = collisionDetectionSystem.createCollisionDetectionComponent(rectangleBody, "player");
player.attachComponent(rectangleBody);
player.attachComponent(playerRenderer);
player.attachComponent(playerController);
player.attachComponent(collisionDetector);

let food = new Entity();
let foodRectangleBody = physicsSystem.createRectangleBodyComponent(new Vec2(300,300), new Vec2(325,325));
let foodRenderer = graphicsSystem.createPolygonRendererComponent(foodRectangleBody);
foodRenderer.color = 0xFF0000;
let foodCollisionDetector = collisionDetectionSystem.createCollisionDetectionComponent(foodRectangleBody, "food");
food.attachComponent(foodRectangleBody);
food.attachComponent(foodRenderer);
food.attachComponent(foodCollisionDetector);

collisionDetectionSystem.registerCollisionHandler("player", "food", (playerBody, foodBody) => {
    foodBody.teleport(new Vec2(Math.random()*600, Math.random()*600));
});

let barrier = new Entity();
let barrierRectangleBody = physicsSystem.createRectangleBodyComponent(new Vec2(400,400), new Vec2(425,425));
let barrierRenderer = graphicsSystem.createPolygonRendererComponent(barrierRectangleBody);
barrierRenderer.color = 0x0000FF;
let barrierCollisionDetector = collisionDetectionSystem.createCollisionDetectionComponent(barrierRectangleBody, "barrier");
barrier.attachComponent(barrierRectangleBody);
barrier.attachComponent(barrierRenderer);
barrier.attachComponent(barrierCollisionDetector);

collisionDetectionSystem.registerCollisionHandler("player", "barrier", (playerBody, barrierBody, collisionVector) => {
    playerBody.translate(collisionVector);
});

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