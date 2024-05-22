import {
  CGFscene,
  CGFcamera,
  CGFaxis,
  CGFappearance,
  CGFtexture,
  CGFshader,
} from "../lib/CGF.js";
import { MyPlane } from "./MyPlane.js";
import { MySphere } from "./MySphere.js";
import { MyPanorama } from "./MyPanorama.js";
import { MyFlower } from "./MyFlower.js";
import { MyGarden } from "./MyGarden.js";
import { MyRock } from "./MyRock.js";
import { MyLeaf } from "./MyLeaf.js";
import { MyStem } from "./MyStem.js";
import { MyReceptacle } from "./MyReceptacle.js";
import { MyPetals } from "./MyPetals.js";
import { MyBee } from "./MyBee.js";
import { MyRockSet } from "./MyRockSet.js";
import { MyPollen } from "./MyPollen.js";
import { MyHive } from "./MyHive.js";
import { MyGrass } from "./MyGrass.js";
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

    this.rows = 5;
    this.cols = 5;
    //Textures
    this.texturePanorama = new CGFtexture(this, "images/panorama4.jpg");

    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.plane = new MyPlane(this, 30);
    this.sphere = new MySphere(this, 32, 8);
    this.rock = new MyRock(this, 16, 8);
    this.panorama = new MyPanorama(this, this.texturePanorama);
    this.flower = new MyFlower(this, new MyPollen(this));
    this.garden = new MyGarden(this, 0, 0, 0, this.rows, this.cols);
    this.bee = new MyBee(this, 0, 3 ,0);
    this.rock = new MyRock(this, 0.5, 0.5, 0.5);
    this.rockSet = new MyRockSet(this, new MyHive(this));
    this.grass = new MyGrass(this, 2500);
    this.setUpdatePeriod(1000/60);

    //Objects connected to MyInterface
    this.displayAxis = true;
    this.scaleFactor = 1;
    this.displayFlower = false;
    this.displayGarden = false;
    this.displayRock = false;
    this.displayRockSet = false;
    this.displayBee = false;
    this.displayGrass = false;
    this.BeeScaleFactor = 1;
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

    this.textureRock = new CGFtexture(this, "images/texturerock.jpg");
    this.appearanceRock = new CGFappearance(this);
    this.appearanceRock.setTexture(this.textureRock);
    this.appearanceRock.setTextureWrap("REPEAT", "REPEAT");

    this.textureGrass = new CGFtexture(this, "images/texturegrass.png");
    this.grassAppearance = new CGFappearance(this);
    this.grassAppearance.setTexture(this.textureGrass);
    this.grassAppearance.setTextureWrap('REPEAT', 'REPEAT');

    this.grassShader = new CGFshader(this.gl, "./shader/grass.vert", "./shader/grass.frag");
    this.grassShader.setUniformsValues({ uSampler2: 1 });
    this.grassShader.setUniformsValues({ uSampler: 0 });
    this.grassShader.setUniformsValues({ timeFactor: 0 });
    this.grassShader.setUniformsValues({ angle: 0 });
    
  }
  initLights() {
    this.lights[0].setPosition(15, 0, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
    this.lights[1].setPosition(4, 0, 14, 1);
    this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[1].enable();
    this.lights[1].update();
  }
  initCameras() {
    this.camera = new CGFcamera(
      Math.PI / 3, // FOV
      0.1,
      1000,
      vec3.fromValues(25, -80, 25),
      vec3.fromValues(0, -90, 0)
    );
  }
  setDefaultAppearance() {
    this.setAmbient(0.8, 0.8, 0.8, 1.0);
    this.setDiffuse(0.8, 0.8, 0.8, 1.0);
    this.setSpecular(0.8, 0.8, 0.8, 1.0);
    this.setShininess(10.0);
  }
  setRockAppearance() {
    this.appearanceRock.apply();
  }

  setGrassAppearance() {  
    this.grassAppearance.apply();
  }


  updateGarden() {
    this.garden.updateGarden(this.rows, this.cols);
  }

  update(t){
    this.checkKeys();
    this.bee.update(t, this.speedFactor, this.BeeScaleFactor);
    this.grassShader.setUniformsValues({ timeFactor: t / 100 % 1000 });
    this.grassShader.setUniformsValues({ angle: Math.sin(t / 100)});
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
    this.appearance.apply();
    this.translate(0,-100,0);
    this.scale(400,400,400);
    this.rotate(-Math.PI/2.0,1,0,0);
    this.plane.display();
    this.popMatrix();


    this.pushMatrix();
    if (this.displayRock) {
      this.translate(0, -100, 0);
      this.setRockAppearance();
      this.rock.display();
    }
    this.popMatrix();

    this.pushMatrix();

    this.translate(-30, -100, 10);
    if (this.displayRockSet) this.rockSet.display();
    this.popMatrix();

    this.pushMatrix();
    this.translate(0, -100, 0);
    if (this.displayFlower) this.flower.display();
    this.popMatrix();

    this.pushMatrix();
    this.translate(-20, -100, -50);
    if (this.displayGarden) this.garden.display();
    this.popMatrix();

    this.pushMatrix();
    this.translate(0, -90, 0);
    if(this.displayBee) this.bee.display();
    this.popMatrix();

    this.pushMatrix();

    this.setGrassAppearance();

    this.setActiveShader(this.grassShader);
    if(this.displayGrass) this.grass.display();
    this.setActiveShader(this.defaultShader);
    this.popMatrix();
    // ---- END Primitive drawing section
  }
}
