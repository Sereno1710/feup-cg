import { CGFobject, CGFappearance } from "../lib/CGF.js";
import { MyCylinder } from "./MyCylinder.js";
/**
 * MyStem
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - Number of slices
 * @param stacks - Number of stacks
 */
export class MyStem extends CGFobject {
  constructor(scene, radius, height, color, angle) {
    super(scene);
    this.radius = radius/6;
    this.height = height;
    this.stem = new MyCylinder(scene, 10, 20);
    this.color = color;
    this.initColours();
    this.angle = angle;
    this.colors = [this.green, this.red, this.blue, this.yellow, this.purple, this.orange, this.white];
  }
  initColours(){
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
    
    this.blue = new CGFappearance(this.scene);
    this.blue.setAmbient(0.1, 0.1, 0.1, 1);
    this.blue.setDiffuse(0.1, 0.1, 0.5, 1);
    this.blue.setSpecular(0.1, 0.1, 0.1, 1);
    this.blue.setShininess(10.0);

    this.yellow = new CGFappearance(this.scene);
    this.yellow.setAmbient(0.1, 0.1, 0.1, 1);
    this.yellow.setDiffuse(0.5, 0.5, 0.1, 1);
    this.yellow.setSpecular(0.1, 0.1, 0.1, 1);
    this.yellow.setShininess(10.0);

    this.purple = new CGFappearance(this.scene);
    this.purple.setAmbient(0.1, 0.1, 0.1, 1);
    this.purple.setDiffuse(0.5, 0.1, 0.5, 1);
    this.purple.setSpecular(0.1, 0.1, 0.1, 1);
    this.purple.setShininess(10.0);

    this.orange = new CGFappearance(this.scene);
    this.orange.setAmbient(0.1, 0.1, 0.1, 1);
    this.orange.setDiffuse(0.5, 0.3, 0.1, 1);
    this.orange.setSpecular(0.1, 0.1, 0.1, 1);
    this.orange.setShininess(10.0);

    this.white = new CGFappearance(this.scene);
    this.white.setAmbient(0.1, 0.1, 0.1, 1);
    this.white.setDiffuse(0.5, 0.5, 0.5, 1);
    this.white.setSpecular(0.1, 0.1, 0.1, 1);
    this.white.setShininess(10.0);
    
  }
  display() {
    this.scene.pushMatrix();
    this.colors[this.color].apply();
    this.scene.rotate(-Math.PI/2, 1, 0, 0);
    this.scene.scale(this.radius, this.radius, 1);
    this.stem.display();
    this.scene.translate(0, 0, 0.9);
    for(var i = 0; i < this.height; i++){
      this.scene.pushMatrix();
      if(i != this.height-1)
      {
      this.scene.translate(0, 0, 0.9*i);
      this.scene.rotate(this.angle[i], 0, 1, 0);
      }
      else 
      this.scene.translate(0, 0, 0.5 + 0.9*(i-1)); 
      this.stem.display();
      this.scene.popMatrix();
    }
    this.scene.popMatrix();
  }
}
