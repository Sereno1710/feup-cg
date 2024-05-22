import { CGFobject, CGFappearance, CGFtexture } from "../lib/CGF.js";
import { MySphere } from "./MySphere.js";

export class MyPanorama extends CGFobject {
  constructor(scene, texture) {
    super(scene);
    
    this.texture = texture;
    this.material = new CGFappearance(scene);
    this.material.setAmbient(0, 0, 0, 0);
    this.material.setDiffuse(0, 0, 0, 0);
    this.material.setSpecular(0, 0, 0, 0);
    this.material.setEmission(1, 1, 1, 1);
    this.material.setTexture(this.texture);
    this.sphere = new MySphere(scene, 32, 8, true);
  }

  display() {
    this.scene.pushMatrix();

    this.scene.translate(this.scene.camera.position[0], this.scene.camera.position[1], this.scene.camera.position[2]);
    this.scene.scale(200, 200, 200);
    this.material.apply();
    this.sphere.display();

    this.scene.popMatrix();
  }
}
