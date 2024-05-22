import { CGFobject, CGFappearance, CGFtexture } from "../lib/CGF.js";
import { MyCylinder } from "./MyCylinder.js";
import { MyLeaf } from "./MyLeaf.js";
/**
 * MyStem
 * @constructor
 * @param scene - Reference to MyScene object
 * @param radius - Radius of the stem
 * @param height - Height of the stem (number of segments)
 * @param angle - Angle of each stem segment
 */
export class MyStem extends CGFobject {
  constructor(scene, radius, height, angle) {
    super(scene);
    this.radius = radius;
    this.height = height;
    this.angle = angle;

    this.initMaterials();
    this.stemMaterials = [this.stemMaterial1, this.stemMaterial2];
    this.leafMaterials = [this.leafMaterial1, this.leafMaterial2];
    this.stemMaterial = this.stemMaterials[Math.floor(Math.random() * 2)];
    this.leafMaterial = this.leafMaterials[Math.floor(Math.random() * 2)];

    this.stem = new MyCylinder(scene, 16, 4);
    this.leaf = new MyLeaf(scene, radius / 16);
  }

  initMaterials() {
    this.stemMaterial1 = new CGFappearance(this.scene);
    this.stemMaterial1.setAmbient(0.8, 0.8, 0.8, 0.0);
    this.stemMaterial1.setDiffuse(0.95, 0.95, 0.95, 0.0);
    this.stemMaterial1.setSpecular(0.5, 0.5, 0.5, 0.0);
    this.stemMaterial1.setTexture(
      new CGFtexture(this.scene, "images/stemtexture1.jpg")
    );
    this.stemMaterial1.setTextureWrap("REPEAT", "REPEAT");

    this.stemMaterial2 = new CGFappearance(this.scene);
    this.stemMaterial2.setAmbient(0.8, 0.8, 0.8, 0.0);
    this.stemMaterial2.setDiffuse(0.95, 0.95, 0.95, 0.0);
    this.stemMaterial2.setSpecular(0.5, 0.5, 0.5, 0.0);
    this.stemMaterial2.setTexture(
      new CGFtexture(this.scene, "images/stemtexture2.jpg")
    );
    this.stemMaterial2.setTextureWrap("REPEAT", "REPEAT");

    this.leafMaterial1 = new CGFappearance(this.scene);
    this.leafMaterial1.setAmbient(0.8, 0.8, 0.8, 0.0);
    this.leafMaterial1.setDiffuse(0.95, 0.95, 0.95, 0.0);
    this.leafMaterial1.setSpecular(0.5, 0.5, 0.5, 0.0);
    this.leafMaterial1.setTexture(
      new CGFtexture(this.scene, "images/leaftexture1.png")
    );
    this.leafMaterial1.setTextureWrap("REPEAT", "REPEAT");

    this.leafMaterial2 = new CGFappearance(this.scene);
    this.leafMaterial2.setAmbient(0.8, 0.8, 0.8, 0.0);
    this.leafMaterial2.setDiffuse(0.95, 0.95, 0.95, 0.0);
    this.leafMaterial2.setSpecular(0.5, 0.5, 0.5, 0.0);
    this.leafMaterial2.setTexture(
      new CGFtexture(this.scene, "images/leaftexture2.png")
    );
    this.leafMaterial2.setTextureWrap("REPEAT", "REPEAT");
  }
  display() {
    this.scene.pushMatrix();

    this.scene.pushMatrix();
    this.stemMaterial.apply();
    this.scene.scale(this.radius, this.radius*4, this.radius);
    this.scene.rotate(-Math.PI / 2, 1, 0, 0);
    this.stem.display();
    this.scene.popMatrix();

    for (let i = 1; i <= this.height - 1; i++) {
      var angle = i % 2 == 0 ? this.angle : -this.angle;

      this.scene.pushMatrix();
      this.stemMaterial.apply();
      this.scene.translate(0, i*this.radius*4, 0);
      if (i == this.height - 1) this.scene.rotate(this.angle, 1, 0, 0);
      else this.scene.rotate(angle, 0, 0, 1);
      this.scene.scale(this.radius, this.radius*4, this.radius);
      this.scene.rotate(-Math.PI / 2, 1, 0, 0);
      this.stem.display();
      this.scene.popMatrix();

      this.scene.pushMatrix();
      this.leafMaterial.apply();
      this.scene.translate(0, i*this.radius*4, 0);
      if (i % 2 != 0) this.scene.rotate(-Math.PI, 0, 0, 1);
      this.scene.scale(this.radius * 3, this.radius * 3, this.radius * 3);
      this.leaf.display();
      this.scene.popMatrix();
    }

    this.scene.popMatrix();
  }
}
