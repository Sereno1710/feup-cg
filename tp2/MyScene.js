import { CGFscene, CGFcamera, CGFaxis } from "../lib/CGF.js";
import { MyDiamond } from "./MyDiamond.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
import { MyTriangleBig } from "./MyTriangleBig.js";
/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
  constructor() {
    super();
  }
  init(application) {
    super.init(application);

    this.initCameras();
    this.initLights();

    //Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.diamond = new MyDiamond(this);
    this.triangle = new MyTriangle(this);
    this.paralellogram = new MyParallelogram(this);
    this.smallTriangle1 = new MyTriangleSmall(this);
    this.smallTriangle2 = new MyTriangleSmall(this);
    this.bigTriangle1 = new MyTriangleBig(this);
    this.bigTriangle2 = new MyTriangleBig(this);
    

    //Objects connected to MyInterface
    this.displayAxis = true;
    this.scaleFactor = 1;
    this.displayDiamond = true;
    this.displayTriangle = true;
    this.displayParallelogram = true;
    this.displaySmallTriangle1 = true;
    this.displaySmallTriangle2 = true;
    this.displayBigTriangle1 = true;
    this.displayBigTriangle2 = true;
  }
  initLights() {
    this.lights[0].setPosition(0, 0, 5, 5);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }
  initCameras() {
    this.camera = new CGFcamera(
      0.4,
      0.1,
      500,
      vec3.fromValues(0, 0, 30),
      vec3.fromValues(0, 0, 0)
    );
  }
  setDefaultAppearance() {
    this.setAmbient(0.0, 0.0, 1.0, 1.0);
    this.setDiffuse(0.0, 0.0, 1.0, 1.0);
    this.setSpecular(0.0, 0.0, 0.0, 1.0);
    this.setShininess(10.0);
  }
  setPurpleColour() {
    this.setAmbient(0.5, 0.0, 1.0, 1.0);
    this.setDiffuse(0.5, 0.0, 1.0, 1.0);
  }
  setRedColour() {
    this.setAmbient(1.0, 0.0, 0.0, 1.0);
    this.setDiffuse(1.0, 0.0, 0.0, 1.0);
  }
  setGreenColour() {
    this.setAmbient(0.0, 1.0, 0.0, 1.0);
    this.setDiffuse(0.0, 1.0, 0.0, 1.0);
  }
  setYellowColour() {
    this.setAmbient(1.0, 1.0, 0.0, 1.0);
    this.setDiffuse(1.0, 1.0, 0.0, 1.0);
  }
  setBlueColour() {
    this.setAmbient(0.0, 0.0, 1.0, 1.0);
    this.setDiffuse(0.0, 0.0, 1.0, 1.0);
  }
  setOrangeColour() {
    this.setAmbient(1.0, 0.3, 0.0, 1.0);
    this.setDiffuse(1.0, 0.3, 0.0, 1.0);
  }
  setPinkColour() {
    this.setAmbient(0.9, 0.4, 0.4, 1.0);
    this.setDiffuse(0.9, 0.4, 0.4, 1.0);
  }
  display() {
    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();
    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    // Draw axis
    if (this.displayAxis) this.axis.display();

    this.setDefaultAppearance();
    
    // Save default matrix
    this.pushMatrix();

    var sca = [
      this.scaleFactor,
      0.0,
      0.0,
      0.0,
      0.0,
      this.scaleFactor,
      0.0,
      0.0,
      0.0,
      0.0,
      this.scaleFactor,
      0.0,
      0.0,
      0.0,
      0.0,
      1.0,
    ];

    this.multMatrix(sca);
    
    // Translation throught the vector (0.8, 2.0, 0.0)
    var tra = [ 1.0, 0.0, 0.0, 0.0,
                0.0, 1.0, 0.0, 0.0,
                0.0, 0.0, 1.0, 0.0,
                0.85, 2.5, 0.0, 1.0 ];

    this.multMatrix(tra);

    var deg2rad = Math.PI / 180.0;
    var a_rad = 60.0 * deg2rad;
    var cos_a = Math.cos(a_rad);
    var sin_a = Math.sin(a_rad);

    // Rotation 60 degrees around the Z axis
    var rot = [ cos_a, -sin_a, 0.0,    0.0,
                sin_a,  cos_a, 0.0,    0.0,
                0.0,    0.0,   1.0,    0.0,
                0.0,    0.0,   0.0,    1.0 ];
    
    this.multMatrix(rot);
    
    this.setGreenColour();

    if (this.displayDiamond) this.diamond.display();

    // Pop the matrix containing the diamond transformations
    this.popMatrix();

    this.pushMatrix();

    // Draw blue triangle
    this.rotate(-Math.PI / 2, 0, 0, 1);
    this.setBlueColour();
    if (this.displayBigTriangle1) this.bigTriangle1.display();

    this.popMatrix();

    this.pushMatrix();

    // Draw orange triangle
    this.translate(2, -2, 0);
    this.rotate(Math.PI / 2, 0, 0, 1);
    this.setOrangeColour();
    if (this.displayBigTriangle2) this.bigTriangle2.display();

    this.popMatrix();

    this.pushMatrix();

    // Draw pink triangle
    this.translate(1.5, -3.5, 0);
    this.setPinkColour();
    if (this.displayTriangle) this.triangle.display();

    this.popMatrix();

    this.pushMatrix();

    // Draw yellow paralellogram
    this.scale(-1, 1, 1)
    this.translate(0, 2, 0);
    this.rotate(-(7*Math.PI)/20, 0, 0, 1);
    this.setYellowColour();
    if (this.displayParallelogram) this.paralellogram.display();

    this.popMatrix();

    this.pushMatrix();

    // Draw purple triangle
    this.translate(0.15, 4.15, 0);
    this.rotate((11*Math.PI)/20, 0, 0, 1);
    this.setPurpleColour();
    if (this.displaySmallTriangle1) this.smallTriangle1.display();

    this.popMatrix();

    this.pushMatrix();

    // Draw purple triangle
    this.translate(-0.65, 2.45, 0);
    this.rotate((3*Math.PI)/20, 0, 0, 1);
    this.setRedColour();
    if (this.displaySmallTriangle2) this.smallTriangle2.display();

  }
}
