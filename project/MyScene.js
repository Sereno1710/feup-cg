import {
  CGFscene,
  CGFcamera,
  CGFaxis,
  CGFappearance,
  CGFshader,
  CGFtexture,
} from "../lib/CGF.js";
import { MyPlane } from "./MyPlane.js";
import { MySphere } from "./MySphere.js";
import { MyPanorama } from "./MyPanorama.js";
import { MyFlower } from "./MyFlower.js";
import {MyGarden} from "./MyGarden.js";
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

    //Textures
    this.texturePanorama = new CGFtexture(this, "images/panorama2.jpg");

    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.plane = new MyPlane(this, 30);
    this.sphere = new MySphere(this, 32,8);
    this.panorama = new MyPanorama(this, this.texturePanorama);
    this.flower = new MyFlower(this,0,0,0);
    this.flowers = [];
    this.rows = 5;
    this.cols = 5;
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
          let position = {
              x: 0 + j * 10 - this.cols * 2, 
              y: 0 + 1, 
              z: 0 + i * 10 - this.rows * 2
          };
          this.flowers.push(new MyFlower(this, position.x, position.y, position.z));
      }
    }
    this.garden = new MyGarden(this, 0, 0, 0, this.flowers);

    //Objects connected to MyInterface
    this.displayAxis = true;
    this.scaleFactor = 1;
    this.displayFlower = false;
    this.displayGarden = false;
    this.enableTextures(true);
    this.texture = new CGFtexture(this, "images/terrain.jpg");
    this.appearance = new CGFappearance(this);
    this.appearance.setTexture(this.texture);
    this.appearance.setTextureWrap("REPEAT", "REPEAT");

    this.textureEarth = new CGFtexture(this, "images/earth.jpg");
    this.appearanceEarth = new CGFappearance(this);
    this.appearanceEarth.setTexture(this.textureEarth);
    this.appearanceEarth.setTextureWrap("REPEAT", "REPEAT");

  }
  initLights() {
    this.lights[0].setPosition(15, 0, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }
  initCameras() {
    this.camera = new CGFcamera(
      Math.PI / 3, // FOV
      0.1,
      1000,
      vec3.fromValues(50, 10, 15),
      vec3.fromValues(0, 0, 0)
    );
    
  }
  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
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
    // ---- BEGIN Primitive drawing section

    this.panorama.display();
    this.pushMatrix();
    if(this.displayFlower) this.flower.display();
    this.popMatrix();
    this.pushMatrix();
    if(this.displayGarden) this.garden.display();
    this.popMatrix();
    // ---- END Primitive drawing section
  }
}