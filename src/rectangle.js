const Vec2 = require("./vec2");

class Rectangle {
    constructor(topLeft, bottomRight) {
        this.points = [topLeft.clone(),new Vec2(bottomRight.x,topLeft.y),bottomRight.clone(),new Vec2(topLeft.x,bottomRight.y)];
    }

    translate(translationVector) {
        this.points.map(x => x.addToThis(translationVector));
    }
}

module.exports = Rectangle;