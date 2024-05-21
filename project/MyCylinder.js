import { CGFobject } from "../lib/CGF.js";
/**
 * MyCylinder
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - Number of slices
 * @param stacks - Number of stacks
 */
export class MyCylinder extends CGFobject {
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
    this.texCoords = [];

    var angle = (2 * Math.PI) / this.slices;

    var z = 1 / this.stacks;

    for (var j = 0; j <= this.stacks; j++) {
      for (var i = 0; i <= this.slices; i++) {
        var x1 = Math.cos(i * angle);
        var y1 = Math.sin(i * angle);

        this.vertices.push(x1, y1, z * j);
        this.normals.push(x1, y1, 0);

        this.texCoords.push(i / this.slices, j / this.stacks);
      }
    }

    this.vertices.push(0, 0, 0);
    this.normals.push(0, 0, -1);
    this.texCoords.push(0.5, 0.5);

    this.vertices.push(0, 0, 1);
    this.normals.push(0, 0, 1);
    this.texCoords.push(0.5, 0.5);

    var bottomCenter = this.vertices.length / 3 - 2;
    var topCenter = this.vertices.length / 3 - 1;

    var baseIndex = 0;

    for (var j = 0; j < this.stacks; j++) {
      for (var i = 0; i <= this.slices; i++) {
        if (i != this.slices) {
          var bottomLeft = baseIndex;
          var bottomRight = baseIndex + 1;
          var topLeft = baseIndex + this.slices + 1;
          var topRight = baseIndex + this.slices + 1 + 1;
        } else {
          var bottomLeft = baseIndex;
          var bottomRight = baseIndex - this.slices + 1 + 1;
          var topLeft = baseIndex + this.slices + 1;
          var topRight = baseIndex + 1;
        }
        this.indices.push(topRight, topLeft, bottomLeft, bottomLeft, bottomRight, topRight);
        
        if(j == 0)
          this.indices.push(bottomRight, bottomLeft, bottomCenter);
        if(j == this.stacks - 1)
          this.indices.push(topLeft, topRight, topCenter);

        baseIndex += 1;
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
