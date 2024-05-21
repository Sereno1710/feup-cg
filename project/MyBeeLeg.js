import { CGFobject, CGFappearance, CGFtexture } from "../lib/CGF.js";
import { MyCylinder } from "./MyCylinder.js";
/**
 * MyBeeLeg
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - Number of slices
 * @param stacks - Number of stacks
 */
export class MyBeeLeg extends CGFobject {
  constructor(scene) {
    super(scene);
    this.initMaterials();
    this.segment = new MyCylinder(scene, 16, 8);
  }

  initMaterials() {
    this.legMaterial = new CGFappearance(this.scene);
    this.legMaterial.setAmbient(0.1, 0.1, 0.1, 1);
    this.legMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
    this.legMaterial.setSpecular(0.1, 0.1, 0.1, 1);
    this.legMaterial.setShininess(10.0);
    this.legMaterial.setTexture(
      new CGFtexture(this.scene, "images/beelegtexture.jpg")
    );
    this.legMaterial.setTextureWrap("REPEAT", "REPEAT");
  }

  display() {
    this.scene.pushMatrix();

    this.legMaterial.apply();
    
    this.scene.pushMatrix();
    this.scene.rotate(-Math.PI / 12, 1, 0, 0);
    this.scene.scale(0.2, 0.2, 1.5);
    this.segment.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0, 0.35, 1.4);  
    this.scene.rotate((7*Math.PI) / 12, 1, 0, 0);
    this.scene.scale(0.15, 0.15, 1.2);
    this.segment.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0, -0.8, 1.1);
    this.scene.rotate(11*Math.PI / 24, 1, 0, 0);
    this.scene.scale(0.13, 0.13, 0.8);
    this.segment.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0, -1.6, 1.2);
    this.scene.scale(0.1, 0.1, 0.6);
    this.segment.display();
    this.scene.popMatrix();

    this.scene.popMatrix();
  }
}
