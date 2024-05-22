import { CGFobject, CGFappearance, CGFtexture } from "../../lib/CGF.js";
import { MyRock } from "./MyRock.js";

/**
 * MyRockSet
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyRockSet extends CGFobject {
  constructor(scene) {
    super(scene);

    this.rocklist = [];
    this.differentRocks = 10;
    for (let i = 0; i < this.differentRocks; i++) {
      this.rocklist.push(new MyRock(this.scene));
    }

    this.anglelist = [];
    this.differentAngles = 7;
    for (let i = 0; i < this.differentAngles; i++) {
      this.anglelist.push(Math.random() * 2 * Math.PI);
    }
  }
  display() {
    this.scene.pushMatrix();

    this.scene.scale(2, 2, 2);
    this.scene.pushMatrix();
    var height = 0;

    for (let i = 5; i >= 2; i--) {
      for (let j = 0; j < i; j++) {
        for (let k = 0; k < i; k++) {
          this.scene.pushMatrix();
          this.scene.translate(j - (i - 1) / 2, height, k - (i - 1) / 2);
          this.scene.rotate(
            this.anglelist[(j + k + i) % this.differentAngles],
            0,
            1,
            0
          );
          this.rocklist[(j + k + i) % this.differentRocks].display();
          this.scene.popMatrix();
        }
      }
      height += 0.5;
    }

    this.scene.popMatrix();

    this.scene.popMatrix();
  }
}
