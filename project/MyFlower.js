import { CGFobject, CGFappearance, CGFtexture } from "../lib/CGF.js";
import { MyStem } from "./MyStem.js";
import { MyPetals } from "./MyPetals.js";
import { MyReceptacle } from "./MyReceptacle.js";
/**
 * MyStem
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - Number of slices
 * @param stacks - Number of stacks
 */
export class MyFlower extends CGFobject {
  constructor(scene) {
    super(scene);

    this.exteriorRadius = Math.random() * (7 - 3) + 3;
    this.petalSize = Math.random() * (3 - 2) + 1;
    this.petalNumber = Math.floor(Math.random() * (16 - 8) + 8);
    this.petalAngle =
      Math.random() * (Math.PI / 3 - Math.PI / 6) + Math.PI / 6;
    this.heartRadius =  this.exteriorRadius - this.petalSize;
    this.stemRadius = Math.random() * (0.8 - 0.3) + 0.3;
    this.stemSize =  Math.floor(Math.random() * (6 - 4) + 4);
    this.stemAngle =
      Math.random() * (Math.PI / 24 - Math.PI / 48) + Math.PI / 48;
    this.coordinates = {
      x: Math.random(),
      y: 0,
      z: Math.random(),
    };

    this.initMaterials();
    this.petalMaterials = [
      this.petalMaterial1,
      this.petalMaterial2,
      this.petalMaterial3,
    ];
    this.petalMaterial = this.petalMaterials[Math.floor(Math.random() * 3)];

    this.stem = new MyStem(
      scene,
      this.stemRadius,
      this.stemSize,
      this.stemAngle
    );
    this.receptacle = new MyReceptacle(
      scene,
      this.heartRadius,
      this.petalNumber
    );
    this.petals = new MyPetals(
      scene,
      this.exteriorRadius,
      this.petalNumber,
      this.petalSize,
      Math.PI / 12,
      Math.PI / 8,
      this.petalAngle
    );
  }
  initMaterials() {
    //petal
    this.petalMaterial1 = new CGFappearance(this.scene);
    this.petalMaterial1.setAmbient(0.8, 0.8, 0.8, 0.0);
    this.petalMaterial1.setDiffuse(0.95, 0.95, 0.95, 0.0);
    this.petalMaterial1.setSpecular(0.5, 0.5, 0.5, 0.0);
    this.petalMaterial1.setTexture(
      new CGFtexture(this.scene, "images/petaltexture1.png")
    );
    this.petalMaterial1.setTextureWrap("REPEAT", "REPEAT");

    this.petalMaterial2 = new CGFappearance(this.scene);
    this.petalMaterial2.setAmbient(0.8, 0.8, 0.8, 0.0);
    this.petalMaterial2.setDiffuse(0.95, 0.95, 0.95, 0.0);
    this.petalMaterial2.setSpecular(0.5, 0.5, 0.5, 0.0);
    this.petalMaterial2.setTexture(
      new CGFtexture(this.scene, "images/petaltexture2.png")
    );
    this.petalMaterial2.setTextureWrap("REPEAT", "REPEAT");

    this.petalMaterial3 = new CGFappearance(this.scene);
    this.petalMaterial3.setAmbient(0.8, 0.8, 0.8, 0.0);
    this.petalMaterial3.setDiffuse(0.95, 0.95, 0.95, 0.0);
    this.petalMaterial3.setSpecular(0.5, 0.5, 0.5, 0.0);
    this.petalMaterial3.setTexture(
      new CGFtexture(this.scene, "images/petaltexture3.png")
    );
    this.petalMaterial3.setTextureWrap("REPEAT", "REPEAT");

    this.receptacleMaterial = new CGFappearance(this.scene);
    this.receptacleMaterial.setAmbient(0.8, 0.8, 0.8, 0.0);
    this.receptacleMaterial.setDiffuse(0.95, 0.95, 0.95, 0.0);
    this.receptacleMaterial.setSpecular(0.5, 0.5, 0.5, 0.0);
    this.receptacleMaterial.setTexture(
      new CGFtexture(this.scene, "images/receptacletexture.jpg")
    );
    this.receptacleMaterial.setTextureWrap(
      "MIRRORED_REPEAT",
      "MIRRORED_REPEAT"
    );
  }
  display() {
    this.scene.pushMatrix();
    this.scene.translate(
      this.coordinates.x,
      this.coordinates.y,
      this.coordinates.z
    );

    this.scene.pushMatrix();
    this.stem.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0, this.stemSize*this.stemRadius*4, 0);
    this.scene.rotate(-this.stemAngle*2, 1, 0, 0);
    this.receptacleMaterial.apply();
    this.receptacle.display();
    this.petalMaterial.apply();
    this.petals.display();
    this.scene.popMatrix();

    this.scene.popMatrix();
  }
}
