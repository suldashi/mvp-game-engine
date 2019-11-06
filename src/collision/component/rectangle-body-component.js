const Vec2 = require("../vec2");

class RectangleBodyComponent {
    constructor(topLeft, bottomRight) {
        this.points = [topLeft.clone(),new Vec2(bottomRight.x,topLeft.y),bottomRight.clone(),new Vec2(topLeft.x,bottomRight.y)];
        this.velocity = new Vec2(0,0);
    }

    setVelocity(newVelocity) {
        this.velocity = newVelocity;
    }

    update(delta) {
        this.points.forEach(x => x.addToThis(this.velocity.scale(delta)));
    }
}

module.exports = RectangleBodyComponent;