import { CGFobject, CGFappearance, CGFtexture } from "../lib/CGF.js";
import { MyBeeAntenna } from "./MyBeeAntenna.js";
import { MySphere } from "./MySphere.js";

/**
 * MyBeeHead
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - Number of slices
 * @param stacks - Number of stacks
 */
export class MyBeeHead extends CGFobject {
  constructor(scene) {
    super(scene);
    this.initMaterials();
    this.sphere = new MySphere(scene, 16, 8);
    this.antenna = new MyBeeAntenna(scene);
  }

  initMaterials() {
    this.beeEyeMaterial = new CGFappearance(this.scene);
    this.beeEyeMaterial.setAmbient(0.1, 0.1, 0.1, 1);
    this.beeEyeMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
    this.beeEyeMaterial.setSpecular(0.1, 0.1, 0.1, 1);
    this.beeEyeMaterial.setShininess(10.0);
    this.beeEyeMaterial.setTexture(
      new CGFtexture(this.scene, "images/beeeyetexture.jpg")
    );
    this.beeEyeMaterial.setTextureWrap("REPEAT", "REPEAT");

    this.beeHeadMaterial = new CGFappearance(this.scene);
    this.beeHeadMaterial.setAmbient(0.1, 0.1, 0.1, 1);
    this.beeHeadMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
    this.beeHeadMaterial.setSpecular(0.1, 0.1, 0.1, 1);
    this.beeHeadMaterial.setShininess(10.0);
    this.beeHeadMaterial.setTexture(
      new CGFtexture(this.scene, "images/beeheadtexture.jpg")
    );
    this.beeHeadMaterial.setTextureWrap("REPEAT", "REPEAT");
  }

  display() {
    this.scene.pushMatrix();
    
    this.scene.pushMatrix();
    this.beeHeadMaterial.apply();
    this.scene.scale(1, 1.5, 1);
    this.sphere.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0.7, 1, 0.2);
    this.scene.rotate(-(5*Math.PI)/12, 0, 0, 1);
    this.scene.rotate(-Math.PI/12, 0, 1, 0);
    this.scene.scale(0.5, 0.5, 0.5);
    this.antenna.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0.7, 1, -0.2);
    this.scene.rotate(-(5*Math.PI)/12, 0, 0, 1);
    this.scene.rotate(Math.PI/12, 0, 1, 0);
    this.scene.scale(0.5, 0.5, 0.5);
    this.antenna.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.beeEyeMaterial.apply();

    this.scene.pushMatrix();
    this.scene.translate(0.3, 0.3, -0.7);
    this.scene.rotate(Math.PI/24, 1, 0, 1);
    this.scene.scale(0.5, 0.8, 0.5);
    this.sphere.display();
    this.scene.popMatrix();
    
    this.scene.pushMatrix();
    this.scene.translate(0.3, 0.3, 0.7);
    this.scene.rotate(-Math.PI/24, 1, 0, -1);
    this.scene.scale(0.5, 0.8, 0.5);
    this.sphere.display();
    this.scene.popMatrix();

    this.scene.popMatrix();

    this.scene.popMatrix();
  }
}
