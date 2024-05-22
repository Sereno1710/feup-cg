import { CGFobject, CGFappearance } from "../lib/CGF.js";
import { MyTriangle } from "./MyTriangle.js";
/**
 * MyStem
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - Number of slices
 * @param stacks - Number of stacks
 */
export class MyPetal extends CGFobject {
  constructor(scene, size, angle) {
    super(scene);
    this.size = size;
    this.angle = angle;
    
    this.petal = new MyTriangle(scene);
  }
  display() {
    this.scene.pushMatrix();

    this.scene.translate(-this.size, 0, 0);
    this.scene.rotate(-Math.PI / 2, 0, 0, 1);
    this.scene.scale(this.size * (4/5), -this.size, 1);
    this.scene.translate(0, -1, 0);
    this.petal.display();

    this.scene.scale(1, -1, 1);
    this.scene.rotate(this.angle, 1, 0, 0);
    this.petal.display();

    this.scene.popMatrix();
  }
}
