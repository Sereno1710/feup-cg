import { CGFobject, CGFappearance } from "../lib/CGF.js";
import { MyBeeHead } from "./MyBeeHead.js";
import { MyBeeTorso } from "./MyBeeTorso.js";
import { MyBeeWing } from "./MyBeeWing.js";
import { MyBeeLeg } from "./MyBeeLeg.js";

/**
 * MyBee
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - Number of slices
 * @param stacks - Number of stacks
 */
export class MyBee extends CGFobject {
  constructor(scene, x, y, z) {
    super(scene);
    this.head = new MyBeeHead(scene);
    this.torso = new MyBeeTorso(scene);
    this.wing = new MyBeeWing(scene);
    this.leg = new MyBeeLeg(scene);

    this.speed = {x: 0, y: 0, z: 0};
    this.orientation = 0;
    this.position = {x: x, y: y, z: z};
    this.defaultPosition = {x: x, y: y, z: z};
    this.time = 0;
    this.maxSpeed = 1;
  }

  display() {
    this.scene.pushMatrix();
    this.scene.translate(this.position.x, this.position.y, this.position.z);
    this.scene.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);
    this.scene.rotate(this.orientation, 0, 1, 0);
    this.scene.pushMatrix();
    this.torso.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(2, 0, 0);
    this.scene.rotate(Math.PI / 12, 0, 0, 1);
    this.head.display();
    this.scene.popMatrix();

    //Legs
    this.scene.pushMatrix();
    this.scene.translate(0.5, -0.5, 0.9);
    this.scene.rotate(Math.PI / 6, 0, 1, 0);
    this.scene.scale(0.5, 0.5, 0.5);
    this.leg.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0, -0.5, 1);
    this.scene.scale(0.5, 0.5, 0.5);
    this.leg.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(-0.3, -0.4, 1);
    this.scene.rotate(-Math.PI / 3, 0, 1, 0);
    this.scene.scale(0.6, 0.6, 0.6);
    this.leg.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0.5, -0.5, -0.9);
    this.scene.rotate(Math.PI - Math.PI / 6, 0, 1, 0);
    this.scene.scale(0.5, 0.5, 0.5);
    this.leg.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0, -0.5, -1);
    this.scene.rotate(Math.PI, 0, 1, 0);
    this.scene.scale(0.5, 0.5, 0.5);
    this.leg.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(-0.3, -0.4, -1);
    this.scene.rotate(Math.PI + Math.PI / 3, 0, 1, 0);
    this.scene.scale(0.6, 0.6, 0.6);
    this.leg.display();
    this.scene.popMatrix();

    // Wings
    this.scene.gl.blendFunc(
      this.scene.gl.SRC_ALPHA,
      this.scene.gl.ONE_MINUS_SRC_ALPHA
    );

    this.scene.pushMatrix();
    this.scene.translate(0.5, 0.8, 0.6);
    this.scene.rotate(-Math.PI / 6 , 0, 1, 0);
    this.scene.rotate(Math.sin(this.time / 250)/2, 1, 0, 0);
    this.wing.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(-0.5, 0.7, 0.6);
    this.scene.rotate(-Math.PI / 6 , 0, 1, 0);
    this.scene.rotate(Math.sin(this.time / 250)/2, 1, 0, 0);
    this.wing.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.scale(1, 1, -1);
    this.scene.translate(0.5, 0.8, 0.6);
    this.scene.rotate(-Math.PI / 6 , 0, 1, 0);
    this.scene.rotate(Math.sin(this.time / 250)/2, 1, 0, 0);
    this.wing.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.scale(1, 1, -1);
    this.scene.translate(-0.5, 0.7, 0.6);
    this.scene.rotate(-Math.PI / 6 , 0, 1, 0);
    this.scene.rotate(Math.sin(this.time / 250)/2, 1, 0, 0);
    this.wing.display();
    this.scene.popMatrix();

    this.scene.popMatrix();
  }
  
  turn(v) {
    this.orientation += v;
  }

  accelerate(v) {
    let newSpeedX = this.speed.x + v * Math.sin(this.orientation);
    let newSpeedZ = this.speed.z + v * Math.cos(this.orientation);

    let speedMagnitude = Math.sqrt(newSpeedX * newSpeedX + newSpeedZ * newSpeedZ);

    if (speedMagnitude <= this.maxSpeed) {
      this.speed.x = newSpeedX;
      this.speed.z = newSpeedZ;
    } else {
      this.speed.x = (newSpeedX / speedMagnitude) * this.maxSpeed;
      this.speed.z = (newSpeedZ / speedMagnitude) * this.maxSpeed;
    }
  }

  handleKeys(v) {
    if (this.scene.gui.isKeyPressed("KeyW")) {
        this.accelerate(v)
    }
    if (this.scene.gui.isKeyPressed("KeyS")) {
        this.accelerate(-v)
    }
    if (this.scene.gui.isKeyPressed("KeyA")) {
        this.turn(-v)
    }
    if (this.scene.gui.isKeyPressed("KeyD")) {
        this.turn(v)
    }
    if (this.scene.gui.isKeyPressed("KeyR")) {
        this.reset()
    }
  }
  reset() {
    this.position = {x: this.defaultPosition.x, y: this.defaultPosition.y, z: this.defaultPosition.z};
    this.orientation = 0;
    this.speed = {x: 0, y: 0, z: 0};
  }
  update(t, speedFactor, scaleFactor) {
    var delta = t - this.time;
    this.scaleFactor = scaleFactor;
    this.time = t;
    this.handleKeys(speedFactor); 
    var verticalMovement = Math.sin(t / 500) * 1; // Adjust the amplitude and frequency as desired

    this.position.x += this.speed.x * delta * Math.sin(this.orientation);
    this.position.z += this.speed.z * delta * Math.cos(this.orientation);
    this.position.y = this.defaultPosition.y + verticalMovement;
  }
}
