import { CGFobject, CGFappearance } from "../lib/CGF.js";
import { MyCone } from "./MyCone.js";
import { MyCylinder } from "./MyCylinder.js";
/**
 * MyStem
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - Number of slices
 * @param stacks - Number of stacks
 */
export class MyStem extends CGFobject {
  constructor(scene, radius, height) {
    super(scene);
    this.radius = radius;
    this.height = height;
    this.stem = new MyCylinder(scene, 10, 20);
    this.stemtop = new MyCone(scene, 10, 20);
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
  }

  display() {
    this.red.apply();
    this.scene.pushMatrix();
    this.scene.rotate(-Math.PI/2, 1, 0, 0);
    for(var i = 0; i < this.height; i++){
      this.scene.scale(this.radius, this.radius, 1);
      this.stem.display();
      this.scene.translate(0, 0, 1);
      if(i == this.height-1)
        break;
    }
    this.scene.popMatrix();
    this.scene.pushMatrix();
    this.scene.translate(0, this.height,0);
    this.scene.rotate(Math.PI,1,0,0);
    this.scene.rotate(Math.PI/4 , 1,0, 1);
    this.scene.scale(this.radius*1.4, this.radius*1.4, this.radius*1.4);
    this.stemtop.display();
  }
}
