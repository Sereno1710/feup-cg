import { CGFobject, CGFappearance, CGFtexture } from "../lib/CGF.js";
import { MySphere } from "./MySphere.js";
import { MyCone } from "./MyCone.js";
/**
 * MyBeeTorso
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBeeTorso extends CGFobject {
  constructor(scene) {
    super(scene);

    this.initMaterials();

    this.sphere = new MySphere(scene, 16, 8);
    this.sting = new MyCone(scene, 16);
  }

  initMaterials() {
    this.stingMaterial = new CGFappearance(this.scene);
    this.stingMaterial.setAmbient(0.1, 0.1, 0.1, 1);
    this.stingMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
    this.stingMaterial.setSpecular(0.1, 0.1, 0.1, 1);
    this.stingMaterial.setShininess(10.0);
    this.stingMaterial.setTexture(
      new CGFtexture(this.scene, "images/stingertexture.jpg")
    );
    this.stingMaterial.setTextureWrap("REPEAT", "REPEAT");

    this.upperBodyMaterial = new CGFappearance(this.scene);
    this.upperBodyMaterial.setAmbient(0.1, 0.1, 0.1, 1);
    this.upperBodyMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
    this.upperBodyMaterial.setSpecular(0.1, 0.1, 0.1, 1);
    this.upperBodyMaterial.setShininess(10.0);
    this.upperBodyMaterial.setTexture(
      new CGFtexture(this.scene, "images/beeupperbodytexture.jpg")
    );
    this.upperBodyMaterial.setTextureWrap("REPEAT", "REPEAT");

    this.lowerBodyMaterial = new CGFappearance(this.scene);
    this.lowerBodyMaterial.setAmbient(0.1, 0.1, 0.1, 1);
    this.lowerBodyMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
    this.lowerBodyMaterial.setSpecular(0.1, 0.1, 0.1, 1);
    this.lowerBodyMaterial.setShininess(10.0);
    this.lowerBodyMaterial.setTexture(
      new CGFtexture(this.scene, "images/beelowerbodytexture.jpg")
    );
    this.lowerBodyMaterial.setTextureWrap("REPEAT", "REPEAT");
  }

  display() {
    this.scene.pushMatrix();
    
    this.scene.pushMatrix();
    this.upperBodyMaterial.apply();
    this.scene.rotate(-Math.PI / 2, 0, 0, 1);
    this.scene.scale(1, 1.5, 1.5);
    this.sphere.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.lowerBodyMaterial.apply();
    this.scene.rotate(-(11*Math.PI)/24, 0, 0, 1);
    this.scene.translate(0, -1.3, 0);
    this.scene.scale(1.3, 2, 1.5);
    this.scene.translate(0, -1, 0);
    this.sphere.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.stingMaterial.apply();
    this.scene.rotate(-(11*Math.PI)/24, 0, 0, 1);
    this.scene.translate(0, -5.2, 0);
    this.scene.scale(0.2, 0.5, 0.2);
    this.sting.display();
    this.scene.popMatrix();

    this.scene.popMatrix();
  }
}
