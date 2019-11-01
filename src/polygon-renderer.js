class PolygonRenderer {
    constructor(graphics, rectangle) {
        this.rectangle = rectangle;
        this.graphics = graphics;
    }

    update() {
        this.graphics.beginFill(0x00FF00);
        this.graphics.drawPolygon(this.rectangle.points.flatMap(point => [point.x, point.y]));
        this.graphics.endFill();
    }
}

module.exports = PolygonRenderer;