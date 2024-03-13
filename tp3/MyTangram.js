import { CGFobject } from "../lib/CGF.js";
import { MyDiamond } from "./MyDiamond.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyTriangleBig } from "./MyTriangleBig.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject {
  constructor(scene) {
    super(scene);
    this.diamond = new MyDiamond(this.scene);
    this.triangle = new MyTriangle(this.scene);
    this.paralellogram = new MyParallelogram(this.scene);
    this.smallTriangle1 = new MyTriangleSmall(this.scene);
    this.smallTriangle2 = new MyTriangleSmall(this.scene);
    this.bigTriangle1 = new MyTriangleBig(this.scene);
    this.bigTriangle2 = new MyTriangleBig(this.scene);
  }
  setPurpleColour() {
    this.scene.setAmbient(0.5, 0.0, 1.0, 1.0);
    this.scene.setDiffuse(0.5, 0.0, 1.0, 1.0);
  }
  setRedColour() {
    this.scene.setAmbient(1.0, 0.0, 0.0, 1.0);
    this.scene.setDiffuse(1.0, 0.0, 0.0, 1.0);
  }
  setGreenColour() {
    this.scene.setAmbient(0.0, 1.0, 0.0, 1.0);
    this.scene.setDiffuse(0.0, 1.0, 0.0, 1.0);
  }
  setYellowColour() {
    this.scene.setAmbient(1.0, 1.0, 0.0, 1.0);
    this.scene.setDiffuse(1.0, 1.0, 0.0, 1.0);
  }
  setBlueColour() {
    this.scene.setAmbient(0.0, 0.0, 1.0, 1.0);
    this.scene.setDiffuse(0.0, 0.0, 1.0, 1.0);
  }
  setOrangeColour() {
    this.scene.setAmbient(1.0, 0.3, 0.0, 1.0);
    this.scene.setDiffuse(1.0, 0.3, 0.0, 1.0);
  }
  setPinkColour() {
    this.scene.setAmbient(0.9, 0.4, 0.4, 1.0);
    this.scene.setDiffuse(0.9, 0.4, 0.4, 1.0);
  }
  setWhiteColour() {
    this.scene.setAmbient(1.0, 1.0, 1.0, 1.0);
    this.scene.setDiffuse(1.0, 1.0, 1.0, 1.0);
  }
  display() {
    this.scene.pushMatrix();

    // Translation throught the vector (0.8, 2.0, 0.0)
    var tra = [
      1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.85, 2.5,
      0.0, 1.0,
    ];
    this.scene.multMatrix(tra);

    var deg2rad = Math.PI / 180.0;
    var a_rad = 60.0 * deg2rad;
    var cos_a = Math.cos(a_rad);
    var sin_a = Math.sin(a_rad);

    // Rotation 60 degrees around the Z axis
    var rot = [
      cos_a,
      -sin_a,
      0.0,
      0.0,
      sin_a,
      cos_a,
      0.0,
      0.0,
      0.0,
      0.0,
      1.0,
      0.0,
      0.0,
      0.0,
      0.0,
      1.0,
    ];
    this.scene.multMatrix(rot);

    this.setGreenColour();
    this.diamond.display();

    // Pop the matrix containing the diamond transformations
    this.scene.popMatrix();

    this.scene.pushMatrix();

    // Draw blue triangle
    this.scene.rotate(-Math.PI / 2, 0, 0, 1);
    this.setBlueColour();
    this.bigTriangle1.display();

    this.scene.popMatrix();

    this.scene.pushMatrix();

    // Draw orange triangle
    this.scene.translate(2, -2, 0);
    this.scene.rotate(Math.PI / 2, 0, 0, 1);
    this.setOrangeColour();
    this.bigTriangle2.display();

    this.scene.popMatrix();

    this.scene.pushMatrix();

    // Draw pink triangle
    this.scene.translate(1.5, -3.5, 0);
    this.setPinkColour();
    this.triangle.display();

    this.scene.popMatrix();

    this.scene.pushMatrix();

    // Draw yellow paralellogram
    this.scene.scale(-1, 1, 1);
    this.scene.translate(0, 2, 0);
    this.scene.rotate(-(7 * Math.PI) / 20, 0, 0, 1);
    this.setYellowColour();
    this.paralellogram.display();

    this.scene.popMatrix();

    this.scene.pushMatrix();

    // Draw purple triangle
    this.scene.translate(0.15, 4.15, 0);
    this.scene.rotate((11 * Math.PI) / 20, 0, 0, 1);
    this.setPurpleColour();
    this.smallTriangle1.display();

    this.scene.popMatrix();

    this.scene.pushMatrix();

    // Draw purple triangle
    this.scene.translate(-0.65, 2.45, 0);
    this.scene.rotate((3 * Math.PI) / 20, 0, 0, 1);
    this.setRedColour();
    this.smallTriangle2.display();

    this.scene.popMatrix();
  }
  updateBuffers(complexity) {
    // reinitialize buffers
    this.initBuffers();
    this.initNormalVizBuffers();
  }
}
