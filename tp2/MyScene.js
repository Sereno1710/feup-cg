import { CGFscene, CGFcamera, CGFaxis } from "../lib/CGF.js";
import { MyComposition } from "./MyComposition.js";
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
    this.compostion = new MyComposition(this);
    //Objects connected to MyInterface
    this.displayAxis = true;
    this.scaleFactor = 1;
    this.displayComposition = true;
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
  setWhiteColour(){
    this.setAmbient(1.0,1.0,1.0,1.0);
    this.setDiffuse(1.0,1.0,1.0,1.0);
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
    this.pushMatrix();
    this.compostion.display();

  }
}
