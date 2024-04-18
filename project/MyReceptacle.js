import { CGFobject, CGFappearance } from "../lib/CGF.js";
import {MyHalfSphere} from "./MyHalfSphere.js";
/**
 * MyStem
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - Number of slices
 * @param stacks - Number of stacks
 */
export class MyReceptacle extends CGFobject {
  constructor(scene, radius,heigth) {
    super(scene);
    this.receptacle = new MyHalfSphere(scene, 32, 8);
    this.radius = radius;
    this.heigth = heigth;
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

    this.purple = new CGFappearance(this.scene);
    this.purple.setAmbient(0.1, 0.1, 0.1, 1);
    this.purple.setDiffuse(0.5, 0.1, 0.5, 1);
    this.purple.setSpecular(0.1, 0.1, 0.1, 1);
    this.purple.setShininess(10.0);

    this.orange = new CGFappearance(this.scene);
    this.orange.setAmbient(0.1, 0.1, 0.1, 1);
    this.orange.setDiffuse(0.5, 0.3, 0.1, 1);
    this.orange.setSpecular(0.1, 0.1, 0.1, 1);
    this.orange.setShininess(10.0);
  }
  display() {

    this.orange.apply();
    this.scene.rotate(-Math.PI/4, 0, 1, 0);
    this.scene.scale(this.radius, -this.radius, this.radius);
    this.receptacle.display();
  }
}
