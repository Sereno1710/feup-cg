import {CGFobject, CGFappearance, CGFtexture} from '../../lib/CGF.js';
import {MyPlane} from "./MyPlane.js";
import {MyFlower} from "./MyFlower.js";

export class MyGarden extends CGFobject{
    constructor(scene, x, y, z, cols , rows) {
        super(scene);
        this.plane = new MyPlane(this.scene, 30);
        this.coordinates = {x: x, y: y, z: z};
        var flowers = [];
        this.rows = rows;
        this.cols = cols;
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.cols; j++) {
              let position = {
                  x: 0 + j * 10 - this.cols * 2 + Math.random() * 2, 
                  y: 0, 
                  z: 0 + i * 10 - this.rows * 2 + Math.random() * 2
              };
              flowers.push(new MyFlower(this.scene, position.x, position.y, position.z));
          }
        }
        this.flowers = flowers;
    }

    display() {
        // Display all the flowers
        for (let i = 0; i < this.flowers.length; i++) {
            this.scene.pushMatrix();
            this.scene.translate(this.flowers[i].coordinates.x , this.flowers[i].coordinates.y, this.flowers[i].coordinates.z);
            this.flowers[i].display();
            this.scene.popMatrix();
        }
    }
}