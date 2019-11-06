const CollisionDetectionComponent = require("../component/collision-detection-component");

class CollisionDetectionSystem {
    constructor() {
        this.components = [];
    }

    createCollisionDetectionComponent() {
        let component = new CollisionDetectionComponent();
        this.components.push(component);
        return component;
    }

    update() {
        
    }

    checkCollision(p1,p2) {
        let smallestIndex = -1;
        let smallestValue = Number.MAX_VALUE;
        let allNormals = [...getNormalAxes(p1.points),...getNormalAxes(p2.points)]
        for(var i in allNormals) {
            let projected1 = projectPolygonToAxis(allNormals[i],p1.points);
            let projected2 = projectPolygonToAxis(allNormals[i],p2.points);
            let flattened1 = flattenPoints(allNormals[i],projected1);
            let flattened2 = flattenPoints(allNormals[i],projected2);
            if(flattened1.x >= flattened2.y || flattened2.x >= flattened1.y) {
                return false;
            }
            else {
                let overlap = measureOverlap(flattened1,flattened2);
                if(Math.abs(overlap) < Math.abs(smallestValue)) {
                    smallestValue = overlap;
                    smallestIndex = i;
                }
            }
        }
        return allNormals[smallestIndex].scale(smallestValue);
    }
    
    measureOverlap(flattened1,flattened2) {
        if(flattened1.x < flattened2.x) {
            if(flattened1.y < flattened2.y) {
                return flattened1.y - flattened2.x;
            }
            else {
                const option1 = flattened1.y - flattened2.x;
                const option2 = flattened2.y - flattened1.x;
                return option1 < option2 ? option1 : -option2;
            }
        }
        else {
            if (flattened1.y > flattened2.y) {
                return flattened1.x - flattened2.y;
            }
            else {
                const option1 = flattened1.y - flattened2.x;
                const option2 = flattened2.y - flattened1.x;
                return option1 < option2 ? option1 : -option2;
            }
        }
    }
    
    flattenPoints(normal,pointArray) {
        let min = Number.MAX_VALUE;
        let max = -Number.MAX_VALUE;
        const len = pointArray.length;
        for (var i = 0; i < len; i++ ) {
        const dot = pointArray[i].dot(normal);
            if (dot < min) { min = dot; }
            if (dot > max) { max = dot; }
        }
        return new Vec2(min,max);
    }
    
    getNormalAxes(polygon) {
        let normals = [];
        for(var i=1;i<polygon.length;i++) {
            normals.push(polygon[i].subtract(polygon[i-1]));
        }
        normals.push(polygon[0].subtract(polygon[polygon.length-1]));
        return normals.map(x => x.normal());
    }
    
    projectPolygonToAxis(axis,polygon) {
        return polygon.map(point => axis.scale(point.dot(axis)/axis.dot(axis)));
    }
}

module.exports = CollisionDetectionSystem;