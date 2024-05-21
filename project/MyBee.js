import { CGFobject, CGFappearance } from "../lib/CGF.js";
import { MyBeeHead } from "./MyBeeHead.js";
import { MyBeeTorso } from "./MyBeeTorso.js";
import { MyBeeWing } from "./MyBeeWing.js";
import { MyBeeLeg } from "./MyBeeLeg.js";

/**
 * MyBee
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - Number of slices
 * @param stacks - Number of stacks
 */
export class MyBee extends CGFobject {
  constructor(scene) {
    super(scene);
    this.head = new MyBeeHead(scene);
    this.torso = new MyBeeTorso(scene);
    this.wing = new MyBeeWing(scene);
    this.leg = new MyBeeLeg(scene);
  }

  display() {
    this.scene.pushMatrix();

    this.scene.pushMatrix();
    this.torso.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(2, 0, 0);
    this.scene.rotate(Math.PI / 12, 0, 0, 1);
    this.head.display();
    this.scene.popMatrix();

    //Legs
    this.scene.pushMatrix();
    this.scene.translate(0.5, -0.5, 0.9);
    this.scene.rotate(Math.PI / 6, 0, 1, 0);
    this.scene.scale(0.5, 0.5, 0.5);
    this.leg.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0, -0.5, 1);
    this.scene.scale(0.5, 0.5, 0.5);
    this.leg.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(-0.3, -0.4, 1);
    this.scene.rotate(-Math.PI / 3, 0, 1, 0);
    this.scene.scale(0.6, 0.6, 0.6);
    this.leg.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0.5, -0.5, -0.9);
    this.scene.rotate(Math.PI - Math.PI / 6, 0, 1, 0);
    this.scene.scale(0.5, 0.5, 0.5);
    this.leg.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0, -0.5, -1);
    this.scene.rotate(Math.PI, 0, 1, 0);
    this.scene.scale(0.5, 0.5, 0.5);
    this.leg.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(-0.3, -0.4, -1);
    this.scene.rotate(Math.PI + Math.PI / 3, 0, 1, 0);
    this.scene.scale(0.6, 0.6, 0.6);
    this.leg.display();
    this.scene.popMatrix();

    // Wings
    this.scene.gl.blendFunc(
      this.scene.gl.SRC_ALPHA,
      this.scene.gl.ONE_MINUS_SRC_ALPHA
    );

    this.scene.pushMatrix();
    this.scene.translate(0.5, 0.8, 0.6);
    this.scene.rotate(-Math.PI / 6, 0, 1, 0);
    this.wing.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(-0.5, 0.7, 0.6);
    this.scene.rotate(-Math.PI / 6, 0, 1, 0);
    this.wing.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.scale(1, 1, -1);
    this.scene.translate(0.5, 0.8, 0.6);
    this.scene.rotate(-Math.PI / 6, 0, 1, 0);
    this.wing.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.scale(1, 1, -1);
    this.scene.translate(-0.5, 0.7, 0.6);
    this.scene.rotate(-Math.PI / 6, 0, 1, 0);
    this.wing.display();
    this.scene.popMatrix();

    this.scene.popMatrix();
  }
}
