import { CGFobject } from "../lib/CGF.js";
import { MyQuad } from "./MyQuad.js";
/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad extends CGFobject {
  constructor(
    scene,
    frontTexture,
    backTexture,
    upTexture,
    rightTexture,
    downTexture,
    leftTexture
  ) {
    super(scene);
    this.quad = new MyQuad(this.scene);

    this.frontTexture = frontTexture || null;
    this.backTexture = backTexture || null;
    this.upTexture = upTexture || null;
    this.rightTexture = rightTexture || null;
    this.downTexture = downTexture || null;
    this.leftTexture = leftTexture || null;
  }

  display() {
    this.scene.pushMatrix();
    this.scene.translate(0.5, -0.5, 0);
    this.scene.scale(1, 1, 1);
    if (this.frontTexture) this.frontTexture.bind();
    this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
    this.quad.display(); // Front face
    if (this.frontTexture) this.frontTexture.unbind();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0.5, -0.5, -1);
    this.scene.rotate(Math.PI, 0, 1, 0);
    this.scene.scale(1, 1, 1);
    if (this.backTexture) this.backTexture.bind();
    this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
    this.quad.display(); // Back face
    if (this.backTexture) this.backTexture.unbind();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0.5, 0, -0.5);
    this.scene.rotate(-Math.PI / 2, 1, 0, 0);
    this.scene.scale(1, 1, 1);
    if (this.upTexture) this.upTexture.bind();
    this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
    this.quad.display(); // Up face
    if (this.upTexture) this.upTexture.unbind();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(1, -0.5, -0.5);
    this.scene.rotate(Math.PI / 2, 0, 1, 0);
    this.scene.scale(1, 1, 1);
    if (this.rightTexture) this.rightTexture.bind();
    this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
    this.quad.display(); // Right face
    if (this.rightTexture) this.rightTexture.unbind();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0.5, -1, -0.5);
    this.scene.rotate(Math.PI / 2, 1, 0, 0);
    this.scene.scale(1, 1, 1);
    if (this.downTexture) this.downTexture.bind();
    this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
    this.quad.display(); // Down face
    if (this.downTexture) this.downTexture.unbind();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0, -0.5, -0.5);
    this.scene.rotate(-Math.PI / 2, 0, 1, 0);
    this.scene.scale(1, 1, 1);
    if (this.leftTexture) this.leftTexture.bind();
    this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
    this.quad.display(); // Left face
    if (this.leftTexture) this.leftTexture.unbind();
    this.scene.popMatrix();
  }
}
