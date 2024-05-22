import { CGFobject , CGFappearance, CGFtexture} from "../lib/CGF.js";
import { MySphere } from "./MySphere.js";
/**
 * MyPollen
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPollen extends CGFobject {
  constructor(scene) {
    super(scene);

    this.initMaterials();

    this.pollen = new MySphere(this.scene, 16, 8);
  }
  initMaterials() {
    this.pollenMaterial = new CGFappearance(this.scene);
    this.pollenMaterial.setAmbient(0.1, 0.1, 0.1, 1);
    this.pollenMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
    this.pollenMaterial.setSpecular(0.1, 0.1, 0.1, 1);
    this.pollenMaterial.setShininess(10.0);
    this.pollenMaterial.setTexture(
      new CGFtexture(this.scene, "images/pollentexture.jpg")
    );
    this.pollenMaterial.setTextureWrap("REPEAT", "REPEAT");
  }
  display() { 
    this.scene.pushMatrix();
    this.pollenMaterial.apply();
    this.scene.scale(0.5, 0.5, 0.7);
    this.pollen.display();
    this.scene.popMatrix();
  }
}
