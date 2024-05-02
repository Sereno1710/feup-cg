import { CGFobject } from "../lib/CGF.js";
/**
 * MyCircle
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - Number of slices
 * @param stacks - Number of stacks
 */
export class MyCircle extends CGFobject {
  constructor(scene, slices) {
    super(scene);
    this.slices = slices;
    this.initBuffers();
  }
  initBuffers() {
    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = []; // Array to hold texture coordinates
    var delta_alpha = Math.PI / 2 / this.stacks;
    var delta_beta = (2 * Math.PI) / this.slices;
    var beta = 0;
    this.texCoords.push(0.5, 0.5);
    for (var i = 0; i <= this.slices; i++) {
        this.vertices.push(Math.cos(beta), Math.sin(beta), 0);
        this.normals.push(0, 0, 1);
        this.indices.push(i, i + 1, this.slices + 1);
        this.indices.push(this.slices+1,i+1,i);
        beta += delta_beta;
        var x = Math.cos(i * beta);
        var y = Math.sin(i * beta);

        // Texture coordinates for the base
        var s = 0.5 + 0.5 * x;
        var t = 0.5 + 0.5 * y;
        this.texCoords.push(s, t);

        }
      
    this.vertices.push(0, 0, 0);
    this.normals.push(0, 0, 1);

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  }
  /**
   * Called when user interacts with GUI to change object's complexity.
   * @param {integer} complexity - changes number of slices
   */
  updateBuffers(complexity) {
    // reinitialize buffers
    this.initBuffers();
    this.initNormalVizBuffers();
  }
}
