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
              flowers.push(new MyFlower(this.scene));
          }
        }
        this.flowers = flowers;
    }

    display() {
        // Display all the flowers
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.scene.pushMatrix();
                this.scene.translate((this.coordinates.x + i)*10, this.coordinates.y, (this.coordinates.z + j)*10);
                this.flowers[i * this.cols + j].display();
                this.scene.popMatrix();
            }
          }
    }

    updateGarden(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        if(this.rows*this.cols < this.flowers.length){
            this.flowers = this.flowers.slice(0, this.rows*this.cols);
        } else if(this.rows*this.cols > this.flowers.length){
            for (let i = this.flowers.length; i < this.rows*this.cols; i++) {
                this.flowers.push(new MyFlower(this.scene));
            }
        }
        this.display();
    }
}