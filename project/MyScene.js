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
import { MyGarden } from "./MyGarden.js";
import { MyRock } from "./MyRock.js";
import { MyPetal } from "./MyPetal.js";
import { MyLeaf } from "./MyLeaf.js";
import { MyStem } from "./MyStem.js";
import { MyReceptacle } from "./MyReceptacle.js";
import { MyPetals } from "./MyPetals.js";
import { MyBee } from "./MyBee.js";
import { MyRockSet } from "./MyRockSet.js";
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
    this.texturePanorama = new CGFtexture(this, "images/panorama4.jpg");

    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.plane = new MyPlane(this, 30);
    this.sphere = new MySphere(this, 32, 8);
    this.rock = new MyRock(this, 16, 8);
    this.panorama = new MyPanorama(this, this.texturePanorama);
    this.flower = new MyFlower(this, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    this.petal = new MyPetal(this, Math.PI / 12, Math.PI / 3);
    this.stem = new MyStem(this, 0.1, 1, 0, 0);
    this.leaf = new MyLeaf(this, 0.1, 0.5, 0, 0);
    this.receptacle = new MyReceptacle(this, 0.5, 1, 0.1, Math.PI / 4, 0);
    this.petals = new MyPetals(this, 0.5, Math.PI / 4, 0);

    this.bee = new MyBee(this,0,3,0);

    this.garden = new MyGarden(this, 0, 0, 0, this.flowers);
    this.rock = new MyRock(this, 0.5,0.5,0.5);
    this.flower = new MyFlower(this,0,0,0);
    this.rockSet = new MyRockSet(this);
    this.setUpdatePeriod(1000/60);

    //Objects connected to MyInterface
    this.displayAxis = true;
    this.scaleFactor = 1;
    this.displayFlower = false;
    this.displayGarden = false;
    this.displayRock = false;
    this.displayRockSet = false;
    this.displayBee = false;
    this.scaleFactor = 1;
    this.speedFactor = 1;

    this.enableTextures(true);
    this.texture = new CGFtexture(this, "images/terrain.jpg");
    this.appearance = new CGFappearance(this);
    this.appearance.setTexture(this.texture);
    this.appearance.setTextureWrap("REPEAT", "REPEAT");

    this.textureEarth = new CGFtexture(this, "images/earth.jpg");
    this.appearanceEarth = new CGFappearance(this);
    this.appearanceEarth.setTexture(this.textureEarth);
    this.appearanceEarth.setTextureWrap("REPEAT", "REPEAT");

    this.textureRock = new CGFtexture(this, "images/texturerock.png");
    this.appearanceRock = new CGFappearance(this);
    this.appearanceRock.setTexture(this.textureRock);
    this.appearanceRock.setTextureWrap("REPEAT", "REPEAT");

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
  setRockAppearance(){
    this.appearanceRock.apply();
  }
  updateGardenSize(cols, rows){
    this.garden = new MyGarden(this, 0, 0, 0, cols, rows);
  }

  update(t){
    this.checkKeys();
    this.bee.update(t, this.speedFactor, this.scaleFactor);
  }

  checkKeys() {

    var text="Keys pressed: ";
    var keysPressed=false;

    if (this.gui.isKeyPressed("KeyW")) {
        text+=" W ";
        keysPressed=true;
    }

    if (this.gui.isKeyPressed("KeyS")){
      text+=" S ";
      keysPressed=true;
    }

    if (this.gui.isKeyPressed("KeyA")){
      text+=" A ";
      keysPressed=true;
    }

    if (this.gui.isKeyPressed("KeyD")){
      text+=" D ";
      keysPressed=true;
    }

    if (keysPressed)
      console.log(text);
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
    this.pushMatrix();
    this.panorama.display();
    this.popMatrix();
    this.pushMatrix();
    if(this.displayRock){
      this.setRockAppearance();
      this.rock.display();
    }
    this.popMatrix()
    this.pushMatrix();
    if(this.displayRockSet) this.rockSet.display();
    this.popMatrix();
    this.pushMatrix();
    if(this.displayFlower) this.flower.display();
    this.popMatrix();
    this.pushMatrix();
    if (this.displayGarden) this.garden.display();
    this.popMatrix();
    this.pushMatrix();
    if(this.displayBee) this.bee.display();
    this.popMatrix();
    // ---- END Primitive drawing section
  }
}
