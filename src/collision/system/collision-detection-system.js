const CollisionDetectionComponent = require("../component/collision-detection-component");
const Vec2 = require("../vec2");

function checkCollision(p1,p2) {
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

function measureOverlap(flattened1,flattened2) {
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

function flattenPoints(normal,pointArray) {
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

function getNormalAxes(polygon) {
    let normals = [];
    for(var i=1;i<polygon.length;i++) {
        normals.push(polygon[i].subtract(polygon[i-1]));
    }
    normals.push(polygon[0].subtract(polygon[polygon.length-1]));
    return normals.map(x => x.normal());
}

function projectPolygonToAxis(axis,polygon) {
    return polygon.map(point => axis.scale(point.dot(axis)/axis.dot(axis)));
}

class CollisionDetectionSystem {
    constructor() {
        this.components = [];
        this.collisionHandlers = {};
    }

    registerCollisionHandler(firstCollisionTag, secondCollisionTag, callback) {
        if(firstCollisionTag < secondCollisionTag) {
            if(!this.collisionHandlers[firstCollisionTag + "|" + secondCollisionTag]) {
                this.collisionHandlers[firstCollisionTag + "|" + secondCollisionTag] = callback;
            }
        }
        else {
            if(!this.collisionHandlers[secondCollisionTag + "|" + firstCollisionTag]) {
                this.collisionHandlers[secondCollisionTag + "|" + firstCollisionTag] = (firstBody, secondBody, collisionVector) => callback(secondBody, firstBody, collisionVector);
            }
        }
        
    }

    createCollisionDetectionComponent(bodyComponent, collisionTag) {
        let component = new CollisionDetectionComponent(bodyComponent, collisionTag);
        this.components.push(component);
        return component;
    }

    update() {
        for(let i=0;i<this.components.length-1;i++) {
            for(let j=i+1;j<this.components.length;j++) {
                if(this.collisionHandlers[this.components[i].collisionTag + "|" + this.components[j].collisionTag]) {
                    let collisionResult = checkCollision(this.components[i].bodyComponent, this.components[j].bodyComponent);
                    if(collisionResult) {
                        this.collisionHandlers[this.components[i].collisionTag + "|" + this.components[j].collisionTag](this.components[i].bodyComponent, this.components[j].bodyComponent, collisionResult);
                    }
                }
                if(this.collisionHandlers[this.components[j].collisionTag + "|" + this.components[i].collisionTag]) {
                    let collisionResult = checkCollision(this.components[j].bodyComponent, this.components[i].bodyComponent);
                    if(collisionResult) {
                        this.collisionHandlers[this.components[j].collisionTag + "|" + this.components[i].collisionTag](this.components[j].bodyComponent, this.components[i].bodyComponent, collisionResult);
                    }
                }
            }
        }
    }
}

module.exports = CollisionDetectionSystem;