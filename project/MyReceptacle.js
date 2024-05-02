import { CGFobject, CGFappearance } from "../lib/CGF.js";
import { MyCircle } from "./MyCircle.js";
/**
 * MyStem
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - Number of slices
 * @param stacks - Number of stacks
 */
export class MyReceptacle extends CGFobject {
  constructor(scene, radius,heigth, stem_radius, angle, petal_number) {
    super(scene);
    this.receptacle = new MyCircle(scene, petal_number);
    this.radius = radius;
    this.heigth = heigth;
    this.angle = angle;
    this.stem_radius = stem_radius;
  }

  display() {

    this.scene.pushMatrix();
    this.scene.translate(0,this.heigth+0.5, 0.5);
    this.scene.rotate(Math.PI/2, -1, 0, 0);
    this.scene.rotate(this.angle, 1, 0, 0);
    this.scene.scale(this.radius, this.radius, this.radius);
    this.receptacle.display();
    this.scene.popMatrix();
  }
}
