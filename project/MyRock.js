import { CGFobject , CGFappearance, CGFtexture} from "../lib/CGF.js";
import { MyRockSphere } from "./MyRockSphere.js";
/**
 * MyRock
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyRock extends CGFobject {
  constructor(scene) {
    super(scene);
    this.rock = new MyRockSphere(this.scene, 16, 8);
    this.scale = Math.random() * 0.3 + 0.4;
    this.orientation = Math.random() * 2 * Math.PI;
    this.position = [0,0,0];
    this.height = 1*this.scale;
  }
  display() { 
    this.scene.pushMatrix();
    this.scene.scale(1, this.scale, 1);
    this.scene.rotate(this.orientation, 1, 0, 1);
    this.scene.setRockAppearance();
    this.rock.display();
    this.scene.popMatrix();
  }
}
