import { CGFobject, CGFappearance } from "../lib/CGF.js";
import {MyTriangle} from "./MyTriangle.js";
import { MyCylinder } from "./MyCylinder.js";
/**
 * MyStem
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - Number of slices
 * @param stacks - Number of stacks
 */
export class MyLeaf extends CGFobject {
  constructor(scene, radius) {
    super(scene);
    this.leaf = new MyTriangle(scene);
    var angles = [Math.PI/4, Math.PI/3, Math.PI/2, Math.PI/6, Math.PI/8, Math.PI/12, Math.PI/16];
    this.angle = angles[Math.floor(Math.random() * 6)];
    this.radius = radius;
    this.leaf_stem = new MyCylinder(scene, 20, 20);

  }
  display() {
    this.scene.pushMatrix();
    this.scene.translate(this.radius, 0, 0);
    this.scene.pushMatrix();
    this.scene.rotate(Math.PI/2, 0, 1, 0);
    this.scene.scale(0.1, 0.1, -3);
    this.leaf_stem.display();
    this.scene.popMatrix();
    this.scene.pushMatrix();
    this.scene.scale(1,0.4,0.6);
    this.scene.rotate(this.angle, 1, 0, 0);
    this.leaf.display();
    this.scene.popMatrix();
    this.scene.pushMatrix();
    this.scene.scale(1,-1,1);
    this.scene.scale(1,0.4,0.6);
    this.scene.rotate(-this.angle, 1, 0, 0);
    this.leaf.display();
    this.scene.popMatrix();
    this.scene.popMatrix();
  }

}
