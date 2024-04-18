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
  constructor(scene, radius,angle) {
    super(scene);
    this.petal = new MyTriangle(scene);
    this.radius = radius;
    this.angle = angle;
    this.initMaterials();
  }

  initMaterials() {
    this.green = new CGFappearance(this.scene);
    this.green.setAmbient(0.1, 0.1, 0.1, 1);
    this.green.setDiffuse(0.1, 0.5, 0.1, 1);
    this.green.setSpecular(0.1, 0.1, 0.1, 1);
    this.green.setShininess(10.0);

    this.red = new CGFappearance(this.scene);
    this.red.setAmbient(0.1, 0.1, 0.1, 1);
    this.red.setDiffuse(0.5, 0.1, 0.1, 1);
    this.red.setSpecular(0.1, 0.1, 0.1, 1);
    this.red.setShininess(10.0);
    
    this.blue = new CGFappearance(this.scene);
    this.blue.setAmbient(0.1, 0.1, 0.1, 1);
    this.blue.setDiffuse(0.1, 0.1, 0.5, 1);
    this.blue.setSpecular(0.1, 0.1, 0.1, 1);
    this.blue.setShininess(10.0);

    this.yellow = new CGFappearance(this.scene);
    this.yellow.setAmbient(0.1, 0.1, 0.1, 1);
    this.yellow.setDiffuse(0.5, 0.5, 0.1, 1);
    this.yellow.setSpecular(0.1, 0.1, 0.1, 1);
    this.yellow.setShininess(10.0);

    this.white = new CGFappearance(this.scene);
    this.white.setAmbient(0.1, 0.1, 0.1, 1);
    this.white.setDiffuse(0.5, 0.5, 0.5, 1);
    this.white.setSpecular(0.1, 0.1, 0.1, 1);
    this.white.setShininess(10.0);
  }
  display() {
    this.scene.pushMatrix();
    this.white.apply();
    this.scene.scale(this.radius-0.1, this.radius-0.1, this.radius-0.1);
    this.petal.display();
    this.scene.scale(1, -1, 1);
    this.scene.rotate(this.angle, 1, 0, 0)
    this.petal.display();
    this.scene.popMatrix();
  }

}
