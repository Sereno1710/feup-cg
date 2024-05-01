import { CGFobject, CGFappearance } from "../lib/CGF.js";
import {MyTriangle} from "./MyTriangle.js";
/**
 * MyStem
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - Number of slices
 * @param stacks - Number of stacks
 */
export class MyPetal extends CGFobject {
  constructor(scene, color) {
    super(scene);
    this.petal = new MyTriangle(scene);
    var angles = [Math.PI/4, Math.PI/3, Math.PI/2, Math.PI/6, Math.PI/8, Math.PI/12];
    this.angle = angles[Math.floor(Math.random() * 5)];
    this.color = color;
    this.initColours();
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
    this.scene.translate(0,-1,0);
    this.petal.display();
    this.scene.scale(1, -1, 1);
    this.scene.rotate(this.angle,1,0,0);
    this.petal.display();
    this.scene.popMatrix();
  }

}
