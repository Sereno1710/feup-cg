import { CGFobject } from "../lib/CGF.js";
/**
 * MyPrism
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - Number of slices
 * @param stacks - Number of stacks
 */
export class MyPrism extends CGFobject {
  constructor(scene, slices, stacks) {
    super(scene);
    this.slices = slices;
    this.stacks = stacks;
    this.initBuffers();
  }
  initBuffers() {
    this.vertices = [];
    this.indices = [];
    this.normals = [];

    var angle = (2 * Math.PI) / this.slices;

    var z = 1 / this.stacks;

    for(var j =0; j < this.stacks; j++){
      for(var i = 0; i < this.slices; i++) {
        var x1 = Math.cos(i * angle);
        var y1 = Math.sin(i * angle);
        var x2 = Math.cos((i + 1) * angle);
        var y2 = Math.sin((i + 1) * angle);

        var xN = Math.cos((i + 0.5) * angle);
        var yN = Math.sin((i + 0.5) * angle);

        var baseIndex = 4 * (i + j * this.slices);

        this.vertices.push(x1, y1, z*j, x2, y2, z*j, x1, y1, z*(j+1), x2, y2, z*(j+1));
        this.indices.push(baseIndex, baseIndex + 1, baseIndex + 2, baseIndex + 3, baseIndex + 2, baseIndex + 1);
        this.normals.push(xN, yN, 0, xN, yN, 0, xN, yN, 0, xN, yN, 0);
      }
    }

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
