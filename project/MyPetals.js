import { CGFobject, CGFappearance } from "../lib/CGF.js";
import {MyPetal} from "./MyPetal.js";
/**
 * MyStem
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - Number of slices
 * @param stacks - Number of stacks
 */
export class MyPetals extends CGFobject {
  constructor(scene, petal_size,angle, height, petal_number, receptacle_radius,petal_color, random) {
    super(scene);
    this.petal = new MyPetal(scene, petal_color);
    this.petal_size = petal_size;
    this.angle = angle;
    this.petal_number = petal_number;
    this.height = height;
    this.receptacle_radius = receptacle_radius;
    this.random = random;
  }

  display() {

    this.scene.pushMatrix();
    var ang = Math.PI*2/this.petal_number;
    this.scene.scale(this.petal_size, this.petal_size, this.petal_size);
    this.scene.translate(0,(this.height)/ this.petal_size,0.51/this.petal_size);
    this.scene.rotate(this.angle,-1,0,0);
    for(var i = 0; i < this.petal_number; i++){
      this.scene.pushMatrix();
      this.scene.translate(Math.sin(ang*i + this.random) * this.receptacle_radius/this.petal_size, -Math.cos(ang*i + this.random)* this.receptacle_radius/this.petal_size , 0);
      this.scene.rotate(ang*i,0,0,1);
      this.petal.display();
      this.scene.popMatrix();
    }
    this.scene.popMatrix();
  }

}
