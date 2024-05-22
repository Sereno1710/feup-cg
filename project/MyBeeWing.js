import { CGFobject, CGFappearance, CGFtexture } from "../lib/CGF.js";
import { MyCircle } from "./MyCircle.js";
/**
 * MyBeeWing
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBeeWing extends CGFobject {
  constructor(scene) {
    super(scene);

    this.initMaterials();

    this.wing = new MyCircle(scene, 32);
  }

  initMaterials() {
    this.wingMaterial = new CGFappearance(this.scene);
    this.wingMaterial.setDiffuse(0.9, 0.9, 0.9, 0.5);
    this.wingMaterial.setDiffuse(0.9, 0.9, 0.9, 0.5);
    this.wingMaterial.setSpecular(0.9, 0.9, 0.9, 0.5);
    this.wingMaterial.setShininess(10.0);
  }

  display() {
    this.scene.pushMatrix();

    this.wingMaterial.apply();
    
    this.scene.pushMatrix();
    this.scene.rotate(-Math.PI / 2, 1, 0, 0);
    this.scene.scale(0.8, 2.5, 0);
    this.scene.translate(0, -1, 0);
    this.wing.display();
    this.scene.popMatrix();

    this.scene.popMatrix();
  }
}
