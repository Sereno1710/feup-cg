import { CGFobject, CGFappearance } from "../lib/CGF.js";
import { MyCircle } from "./MyCircle.js";
import { MyCone } from "./MyCone.js";
/**
 * MyStem
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - Number of slices
 * @param stacks - Number of stacks
 */
export class MyReceptacle extends CGFobject {
  constructor(scene, radius,heigth, stem_radius, angle, petal_number, recep_color, stem_color) {
    super(scene);
    this.receptacle = new MyCircle(scene, petal_number);
    this.stemtop = new MyCone(scene, petal_number, petal_number);
    this.top= new MyCircle(scene, petal_number);
    this.radius = radius;
    this.heigth = heigth;
    this.angle = angle;
    this.stem_radius = stem_radius;
    this.recep_color = recep_color;
    this.stem_color = stem_color;
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
    this.colors[this.stem_color].apply();
    this.scene.translate(0, this.heigth+ 0.5, 0.5);
    this.scene.rotate(this.angle, 1, 0, 0);
    this.scene.scale(this.stem_radius, 1.1, this.stem_radius);
    this.stemtop.display();
    this.scene.popMatrix();
    this.scene.pushMatrix();
    this.colors[this.stem_color].apply();
    this.scene.translate(0, this.heigth+0.5, 0.49);
    this.scene.rotate(Math.PI/2, -1, 0, 0);
    this.scene.rotate(this.angle, 1, 0, 0);
    this.scene.scale(this.radius*0.75, this.radius*0.75, this.radius*0.75);
    this.top.display();
    this.scene.popMatrix();
    this.scene.pushMatrix();
    this.colors[this.recep_color].apply();
    this.scene.translate(0,this.heigth+0.5, 0.5);
    this.scene.rotate(Math.PI/2, -1, 0, 0);
    this.scene.rotate(this.angle, 1, 0, 0);
    this.scene.scale(this.radius, this.radius, this.radius);
    this.receptacle.display();
    this.scene.popMatrix();
  }
}
