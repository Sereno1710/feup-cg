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
  constructor(scene, minAngle, maxAngle) {
    super(scene);
    this.petal = new MyTriangle(scene);
    this.angle = Math.random() * (maxAngle - minAngle) + minAngle;
  }
  display() {
    this.scene.pushMatrix();
    this.scene.translate(-4, 0, 0);
    this.scene.rotate(-Math.PI/2, 0, 0, 1);
    this.scene.scale(1, -2, 1);
    this.scene.translate(0, -1, 0);   
    this.petal.display();
    this.scene.scale(1, -1, 1);
    this.scene.rotate(-this.angle,1,0,0);
    this.petal.display();
    this.scene.popMatrix();
  }

}
