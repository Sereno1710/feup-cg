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
  constructor(
    scene,
    exteriorRadius,
    petalNumber,
    petalColour,
    heartRadius,
    heartColour,
    stemRadius,
    stemSize,
    stemColour,
    leafColour,
    x,
    y,
    z
  ) {
    super(scene);

    this.initMaterials();
    this.petalMaterials = [
      this.petalMaterial1,
      this.petalMaterial2,
      this.petalMaterial3,
    ];
    this.petalMaterial = this.petalMaterials[Math.floor(Math.random() * 3)];
    this.randomize();
    this.coordinates = { x: x, y: y, z: z };
    this.stem = new MyStem(
      scene,
      this.stem_radius,
      this.stem_size,
      this.incline,
      this.petal_number
    );
    this.receptacle = new MyReceptacle(
      scene,
      this.receptacle_radius,
      this.stem_size,
      this.stem_radius,
      Math.PI / 4,
      this.petal_number
    );
    if (this.flower_radius <= this.receptacle_radius)
      this.flower_radius = this.receptacle_radius + 1;
    var petal_size = this.flower_radius - this.receptacle_radius;
    this.petals = new MyPetals(
      scene,
      petal_size,
      Math.PI / 4,
      this.stem_size,
      this.petal_number,
      this.receptacle_radius,
      this.petal_random
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

  randomize() {
    this.petal_number = Math.floor(Math.random() * 10) + 10;
    this.stem_radius = Math.floor(Math.random() * 2) + 2;
    this.stem_size = Math.floor(Math.random() * 7) + 3;
    this.receptacle_radius = Math.floor(Math.random() * 2) + 3;
    this.flower_radius = Math.floor(Math.random() * 3) + 4;
    this.receptacle_color = Math.floor(Math.random() * 6);
    this.petal_random = Math.random() * 0.3 + 0.01;
    var stem_angles = [];
    for (var i = 0; i < this.stem_size - 1; i++) {
      stem_angles.push(
        Math.random() *
          0.2 *
          (Math.random() > 0.5 ? 1 : -1) *
          (Math.random() > 0.2 ? 1 : 0)
      );
    }
    this.incline = stem_angles;
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
    this.receptacleMaterial.apply();
    this.receptacle.display();
    this.scene.popMatrix();
    this.scene.pushMatrix();
    this.petalMaterial.apply();
    this.petals.display();
    this.scene.popMatrix();
    this.scene.popMatrix();
  }
}
