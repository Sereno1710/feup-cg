import { CGFobject , CGFappearance, CGFtexture} from "../lib/CGF.js";
import { MyRockSphere } from "./MyRockSphere.js";
/**
 * MyRock
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - Number of slices
 * @param stacks - Number of stacks
 */
export class MyRock extends CGFobject {
  constructor(scene, x, y, z) {
    super(scene);
    this.rock = new MyRockSphere(this.scene, 16, 8);
    this.coordinates = {x: x, y: y, z: z};
    this.scale = Math.random() * 0.5 + 0.1;
  }
  display() { 
    this.scene.pushMatrix();
    this.scene.translate(this.coordinates.x, this.coordinates.y, this.coordinates.z);
    this.scene.scale(1, this.scale, 1);
    this.scene.setRockAppearance();
    this.rock.display();
    this.scene.popMatrix();
  }
}
