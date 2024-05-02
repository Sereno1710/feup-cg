import {CGFobject, CGFappearance, CGFtexture} from '../../lib/CGF.js';
import {MyPlane} from "./MyPlane.js";
import {MyFlower} from "./MyFlower.js";

export class MyGarden extends CGFobject{
    constructor(scene, x, y, z, flowers) {
        super(scene);
        this.plane = new MyPlane(this.scene, 30);
        this.coordinates = {x: x, y: y, z: z};
        this.flowers = flowers;
    }

    display() {
        // Display all the flowers
        for (let i = 0; i < this.flowers.length; i++) {
            this.scene.pushMatrix();
            this.scene.translate(this.flowers[i].coordinates.x + Math.random() * 2, this.flowers[i].coordinates.y, this.flowers[i].coordinates.z + Math.random() * 2);
            this.flowers[i].display();
            this.scene.popMatrix();
        }
    }
}