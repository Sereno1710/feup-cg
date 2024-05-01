import { CGFobject, CGFappearance } from "../lib/CGF.js";
import { MyStem } from "./MyStem.js";
import { MyPetals } from "./MyPetals.js";
import { MyReceptacle } from "./MyReceptacle.js";
/**
 * MyStem
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - Number of slices
 * @param stacks - Number of stacks
 */
export class MyFlower extends CGFobject {
  constructor(scene) {
    super(scene);
    this.randomize();
    this.stem = new MyStem(scene, this.stem_radius, this.stem_size, this.stem_color, this.incline);
    this.receptacle = new MyReceptacle(scene, this.receptacle_radius, this.stem_size, this.stem_radius, Math.PI/4, this.petal_number, this.receptacle_color, this.stem_color);
    if (this.flower_radius <= this.receptacle_radius) this.flower_radius = this.receptacle_radius + 1;
    var petal_size = this.flower_radius - this.receptacle_radius;
    this.petals = new MyPetals(scene, petal_size, Math.PI/4, this.stem_size, this.petal_number, this.receptacle_radius, this.petal_color, this.petal_random);
  }
  randomize(){
    this.petal_number = Math.floor(Math.random() * 10) + 6;
    this.petal_color = Math.floor(Math.random() * 6);
    this.stem_radius = Math.floor(Math.random() * 2) + 2;
    this.stem_size = Math.floor(Math.random()*7) + 3;
    this.receptacle_radius = Math.floor(Math.random() * 2) + 3;
    this.flower_radius = Math.floor(Math.random() * 3) + 4;
    this.stem_color = Math.floor(Math.random() * 6);
    this.receptacle_color = Math.floor(Math.random() * 6);
    this.petal_random = (Math.random()*0.3) + 0.01;
    var stem_angles= [];
    for(var i = 0; i < this.stem_size-1; i++){
      stem_angles.push( Math.random()*0.3 * (Math.random() > 0.5 ? 1 : -1)* (Math.random() > 0.2 ? 1 : 0));
    }
    this.incline = stem_angles;
  }
  display(){
    this.scene.pushMatrix();
    this.stem.display();
    this.scene.popMatrix();
    this.scene.pushMatrix();
    this.receptacle.display();
    this.scene.popMatrix();
    this.scene.pushMatrix();
    this.petals.display();
    this.scene.popMatrix();
  }
}
