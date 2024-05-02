import { CGFobject, CGFappearance , CGFtexture} from "../lib/CGF.js";
import { MyCylinder } from "./MyCylinder.js";
import { MyLeaf } from "./MyLeaf.js";
import { MyCone } from "./MyCone.js";
import { MyCircle } from "./MyCircle.js";
/**
 * MyStem
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - Number of slices
 * @param stacks - Number of stacks
 */
export class MyStem extends CGFobject {
  constructor(scene, radius, height,  angle, petal_number) {
    super(scene);
    this.radius = radius/6;
    this.height = height;
    this.initMaterials();
    this.stemMaterials = [this.stemMaterial1, this.stemMaterial2];
    this.leafMaterials = [this.leafMaterial1, this.leafMaterial2];
    this.stemMaterial = this.stemMaterials[Math.floor(Math.random()*2)];
    this.leafMaterial = this.leafMaterials[Math.floor(Math.random()*2)];
    this.stem = new MyCylinder(scene, 10, 20);
    this.stemtop = new MyCone(scene, petal_number, petal_number);
    this.leaf = new MyLeaf(scene, radius);
    this.top= new MyCircle(scene, petal_number);
    this.angle = angle;
  }

  initMaterials(){
    this.stemMaterial1 = new CGFappearance(this.scene);
    this.stemMaterial1.setAmbient(0.8, 0.8, 0.8, 0.0);
    this.stemMaterial1.setDiffuse(0.95, 0.95, 0.95, 0.0);
    this.stemMaterial1.setSpecular(0.5, 0.5, 0.5, 0.0);
    this.stemMaterial1.setTexture(new CGFtexture(this.scene, "images/stemtexture1.jpg"));
    this.stemMaterial1.setTextureWrap('REPEAT', 'REPEAT');

    this.stemMaterial2 = new CGFappearance(this.scene);
    this.stemMaterial2.setAmbient(0.8, 0.8, 0.8, 0.0);
    this.stemMaterial2.setDiffuse(0.95, 0.95, 0.95, 0.0);
    this.stemMaterial2.setSpecular(0.5, 0.5, 0.5, 0.0);
    this.stemMaterial2.setTexture(new CGFtexture(this.scene, "images/stemtexture2.jpg"));
    this.stemMaterial2.setTextureWrap('REPEAT', 'REPEAT');

    this.leafMaterial1 = new CGFappearance(this.scene);
    this.leafMaterial1.setAmbient(0.8, 0.8, 0.8, 0.0);
    this.leafMaterial1.setDiffuse(0.95, 0.95, 0.95, 0.0);
    this.leafMaterial1.setSpecular(0.5, 0.5, 0.5, 0.0);
    this.leafMaterial1.setTexture(new CGFtexture(this.scene, "images/leaftexture1.png"));
    this.leafMaterial1.setTextureWrap('REPEAT', 'REPEAT');

    this.leafMaterial2 = new CGFappearance(this.scene);
    this.leafMaterial2.setAmbient(0.8, 0.8, 0.8, 0.0);
    this.leafMaterial2.setDiffuse(0.95, 0.95, 0.95, 0.0);
    this.leafMaterial2.setSpecular(0.5, 0.5, 0.5, 0.0);
    this.leafMaterial2.setTexture(new CGFtexture(this.scene, "images/leaftexture2.png"));
    this.leafMaterial2.setTextureWrap('REPEAT', 'REPEAT');
  }
  display() {
    this.scene.pushMatrix();
    this.stemMaterial.apply();
    this.scene.rotate(-Math.PI/2, 1, 0, 0);
    this.scene.scale(this.radius, this.radius, 1);
    this.stem.display();
    this.scene.translate(0, 0, 0.9);
    for(var i = 0; i < this.height; i++){
      this.scene.pushMatrix();
      this.stemMaterial.apply();
      if(i != this.height-1)
      {
        this.scene.translate(0, 0, 0.9*i);
        this.scene.pushMatrix();
        this.scene.rotate(this.angle[i], 0, 1, 0);
        this.stem.display();
        this.scene.popMatrix();
        if(this.angle[i] != 0)
        {
          if(this.angle[i] > 0)
            this.scene.rotate(Math.PI, 0, 1, 0);
          this.leafMaterial.apply();
          this.leaf.display();
        }
      }
      else 
      {      
        this.scene.translate(0, 0, 0.5 + 0.9*(i-1)); 
        this.stem.display();
      }
      this.scene.popMatrix();
    }
    this.scene.popMatrix();
    this.scene.pushMatrix();
    this.stemMaterial.apply();
    this.scene.translate(0, this.heigth+ 0.5, 0.5);
    this.scene.rotate(this.angle, 1, 0, 0);
    this.scene.scale(this.radius, 1.1, this.radius);
    this.stemtop.display();
    this.scene.popMatrix();
    this.scene.pushMatrix();
    this.stemMaterial.apply();
    this.scene.translate(0, this.heigth+0.5, 0.49);
    this.scene.rotate(Math.PI/2, -1, 0, 0);
    this.scene.rotate(this.angle, 1, 0, 0);
    this.scene.scale(this.radius*0.75, this.radius*0.75, this.radius*0.75);
    this.top.display();
    this.scene.popMatrix();
  }
}
