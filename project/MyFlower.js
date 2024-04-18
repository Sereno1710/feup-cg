import { CGFobject, CGFappearance } from "../lib/CGF.js";
import { MyStem } from "./MyStem.js";
import { MyPetal } from "./MyPetal.js";
import { MyReceptacle } from "./MyReceptacle.js";
/**
 * MyStem
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - Number of slices
 * @param stacks - Number of stacks
 */
export class MyFlower extends CGFobject {
  constructor(scene, flower_radius, stem_size, stem_radius, receptacle_radius, petal_number) {
    super(scene);
    this.stem = new MyStem(scene, stem_radius, stem_size);
    this.receptacle = new MyReceptacle(scene, receptacle_radius, stem_size);
    this.petal = new MyPetal(scene, flower_radius, Math.PI/4, stem_size);
  }
  display(){
    this.scene.pushMatrix();
    this.stem.display();
    this.scene.popMatrix();
    this.scene.pushMatrix();
    this.receptacle.display();
    this.scene.popMatrix();
    this.scene.pushMatrix();
    this.petal.display();
    this.scene.popMatrix();
  }
}
