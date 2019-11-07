class PolygonRendererComponent {
    constructor(graphics, rectangle) {
        this.rectangle = rectangle;
        this.graphics = graphics;
        this.color = 0x00FF00;
    }

    update() {
        this.graphics.beginFill(this.color);
        this.graphics.drawPolygon(this.rectangle.points.flatMap(point => [point.x, point.y]));
        this.graphics.endFill();
    }
}

module.exports = PolygonRendererComponent;