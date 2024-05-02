import { CGFobject, CGFappearance } from "../lib/CGF.js";
import {MyTriangle} from "./MyTriangle.js";
/**
 * MyStem
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - Number of slices
 * @param stacks - Number of stacks
 */
export class MyPetal extends CGFobject {
  constructor(scene) {
    super(scene);
    this.petal = new MyTriangle(scene);
    var angles = [Math.PI/4, Math.PI/3, Math.PI/2, Math.PI/6, Math.PI/8, Math.PI/12];
    this.angle = angles[Math.floor(Math.random() * 5)];
  }
  display() {
    this.scene.pushMatrix();
    this.scene.translate(0,-1,0);
    this.petal.display();
    this.scene.scale(1, -1, 1);
    this.scene.rotate(this.angle,1,0,0);
    this.petal.display();
    this.scene.popMatrix();
  }

}
