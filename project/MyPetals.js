import { CGFobject, CGFappearance } from "../lib/CGF.js";
import {MyPetal} from "./MyPetal.js";
/**
 * MyStem
 * @constructor
 * @param scene - Reference to MyScene object
 * @param radius - Radius of the petals
 * @param petalNumber - Number of petals
 * @param petalSize - Size of the petals
 * @param minAngle - Minimum angle when the petals touch the heart
 * @param maxAngle - Maximum angle when the petals touch the heart
 * @param petalAngle - Angle of the petals
 */
export class MyPetals extends CGFobject {
  constructor(scene, radius, petalNumber, petalSize, minAngle, maxAngle, petalAngle) {
    super(scene);
    this.radius = radius;
    this.petalNumber = petalNumber;
    this.petalSize = petalSize;
    this.angle = Math.random() * (maxAngle - minAngle) + minAngle;

    this.petal = new MyPetal(scene, petalSize, petalAngle);
  }
  
  display() {
    this.scene.pushMatrix();
    this.scene.translate(0, 0, 0.9);
    var delta_alpha = Math.PI*2/this.petalNumber;

    for (let i = 0; i < this.petalNumber; i++) {
      this.scene.pushMatrix();
      this.scene.rotate(delta_alpha*i, 0, 0, 1);
      this.scene.translate(this.radius - this.petalSize, 0, 0);
      this.scene.rotate(-this.angle, 0, 1, 0);
      this.scene.translate(this.petalSize, 0, 0);
      this.petal.display();
      this.scene.popMatrix();
    }
    this.scene.popMatrix();
  }

}
