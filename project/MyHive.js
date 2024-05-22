import { CGFobject, CGFappearance, CGFtexture } from "../../lib/CGF.js";
import { MySphere } from "./MySphere.js";

/**
 * MyHive
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyHive extends CGFobject {
  constructor(scene) {
    super(scene);

    this.initMaterials();

    this.hiveSegment = new MySphere(this.scene, 16, 8);
  }
  initMaterials() {
    this.hiveMaterial = new CGFappearance(this.scene);
    this.hiveMaterial.setAmbient(0.1, 0.1, 0.1, 1);
    this.hiveMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
    this.hiveMaterial.setSpecular(0.1, 0.1, 0.1, 1);
    this.hiveMaterial.setShininess(10.0);
    this.hiveMaterial.setTexture(
      new CGFtexture(this.scene, "images/hivetexture.jpg")
    );
    this.hiveMaterial.setTextureWrap("REPEAT", "REPEAT");
  }
  display() {
    this.scene.pushMatrix();

    this.hiveMaterial.apply();
    this.scene.scale(0.5, 0.5, 0.5);

    this.scene.pushMatrix();
    var radiuses = [3, 3, 3, 2.5, 2, 1];

    for (var i = 0; i < radiuses.length; i++) {
      this.scene.pushMatrix();
      this.scene.translate(0, 0.5 * i, 0);
      this.scene.scale(radiuses[i], 1, radiuses[i]);
      this.hiveSegment.display();
      this.scene.popMatrix();
    }

    this.scene.popMatrix();

    this.scene.popMatrix();
  }
}
