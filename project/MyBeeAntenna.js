import { CGFobject, CGFappearance, CGFtexture } from "../lib/CGF.js";
import { MyCylinder } from "./MyCylinder.js";
import { MySphere } from "./MySphere.js";
/**
 * MyBeeAntenna
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - Number of slices
 * @param stacks - Number of stacks
 */
export class MyBeeAntenna extends CGFobject {
  constructor(scene) {
    super(scene);
    this.initMaterials();
    this.segment = new MyCylinder(scene, 16, 8);
    this.sphere = new MySphere(scene, 16, 8);
  }

  initMaterials() {
    this.antennaMaterial = new CGFappearance(this.scene);
    this.antennaMaterial.setAmbient(0.1, 0.1, 0.1, 1);
    this.antennaMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
    this.antennaMaterial.setSpecular(0.1, 0.1, 0.1, 1);
    this.antennaMaterial.setShininess(10.0);
    this.antennaMaterial.setTexture(
      new CGFtexture(this.scene, "images/beelegtexture.jpg")
    );
    this.antennaMaterial.setTextureWrap("REPEAT", "REPEAT");
  }

  display() {
    this.scene.pushMatrix();

    this.antennaMaterial.apply();
    
    this.scene.pushMatrix();
    this.scene.rotate(-Math.PI / 2, 1, 0, 0);
    this.scene.scale(0.1, 0.1, 0.5);
    this.segment.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0, 0.4, 0);
    this.scene.rotate(Math.PI / 12, 0, 0, 1);
    this.scene.rotate(Math.PI / 2, 0, 1, 0);
    this.scene.scale(0.1, 0.1, 1);
    this.segment.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0, 0.4, 0);
    this.scene.rotate(Math.PI / 12, 0, 0, 1);
    this.scene.translate(1, 0, 0);
    this.scene.scale(0.15, 0.15, 0.15);
    this.sphere.display();
    this.scene.popMatrix();

    this.scene.popMatrix();
  }
}
