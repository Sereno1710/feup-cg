import { CGFobject, CGFappearance } from "../lib/CGF.js";
import { MyCircle } from "./MyCircle.js";
import { MyCone } from "./MyCone.js";
/**
 * MyStem
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - Number of slices
 * @param stacks - Number of stacks
 */
export class MyReceptacle extends CGFobject {
  constructor(scene, radius, petal_number) {
    super(scene);
    this.circle = new MyCircle(scene, petal_number);
    this.cone = new MyCone(scene, petal_number, 4);
    this.radius = radius;
  }

  display() {
    this.scene.pushMatrix();
    this.scene.translate(0, 0, 1); 
    this.scene.scale(this.radius, this.radius, 1);
    this.circle.display();
    this.scene.rotate(Math.PI / 2, 1, 0, 0);
    this.cone.display();
    this.scene.popMatrix();
  }
}
