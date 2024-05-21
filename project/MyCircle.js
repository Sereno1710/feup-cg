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
    this.texCoords = [];

    var delta_alpha = (2 * Math.PI) / this.slices;
    var alpha = 0;

    this.vertices.push(0, 0, 0);
    this.normals.push(0, 0, 1);
    this.texCoords.push(0.5, 0.5);

    for (var i = 0; i < this.slices; i++) {
      var x = Math.cos(alpha);
      var y = Math.sin(alpha);

      this.vertices.push(x, y, 0);
      this.normals.push(0, 0, 1);
      this.texCoords.push(0.5 + 0.5 * x, 0.5 - 0.5 * y);

      var currentVertex = i + 1;
      var nextVertex = i == this.slices - 1 ? 1 : currentVertex + 1;

      this.indices.push(0, currentVertex, nextVertex);
      this.indices.push(0, nextVertex, currentVertex);

      alpha += delta_alpha;
    }

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  }
}
