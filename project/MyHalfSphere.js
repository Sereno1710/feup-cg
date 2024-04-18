import { CGFobject } from "../lib/CGF.js";
/**
 * MyHalfSphere
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - Number of slices
 * @param stacks - Number of stacks
 */
export class MyHalfSphere extends CGFobject {
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
    var delta_alpha = Math.PI / 2 / this.stacks;
    var delta_beta = (2 * Math.PI) / this.slices;
    var equatorVertices = [];
    var equatorNormals = [];
    var northVertices = [];
    var northNormals = [];
    for (var i = 0; i < this.stacks; i++) {
      for (var j = 0; j < this.slices; j++) {
        var alpha = i * delta_alpha;
        var beta = j * delta_beta;
        var x1 = Math.sin(beta) * Math.cos(alpha);
        var y1 = Math.sin(alpha);
        var z1 = Math.cos(beta) * Math.cos(alpha);
        if (i == 0) {
          equatorVertices.push(x1, y1, z1);
          equatorNormals.push(x1, y1, z1);
        } else {
          northVertices.push(x1, y1, z1);
          northNormals.push(x1, y1, z1);
        }
      }
    }
    // Equator
    this.vertices = this.vertices.concat(equatorVertices);
    this.normals = this.normals.concat(equatorNormals);
    // North Hemisphere
    this.vertices = this.vertices.concat(northVertices);
    this.normals = this.normals.concat(northNormals);
    // North Pole
    this.vertices.push(0, 1, 0);
    this.normals.push(0, 1, 0);
    // Choosing all indices apart from the triangles on the poles

    var layerPointCount = this.slices;
    var hemispherePointCount = (this.stacks - 1) * this.slices;

    for (var i = 0; i < this.stacks - 1; i++) {
      var layerBaseIndex = i * this.slices;
      for (var j = 0; j < this.slices; j++) {
        var northSquareBottomLeft = layerBaseIndex + j;
        var northSquareTopLeft = layerBaseIndex + layerPointCount + j;
        if (j == this.slices - 1) {
          // Loop back to first vertex
          var northSquareBottomRight = layerBaseIndex;
          var northSquareTopRight = layerBaseIndex + layerPointCount;
        } else {
          var northSquareBottomRight = layerBaseIndex + j + 1;
          var northSquareTopRight = layerBaseIndex + layerPointCount + j + 1;
        }
        this.indices.push(
          northSquareTopRight,
          northSquareTopLeft,
          northSquareBottomLeft,
          northSquareBottomLeft,
          northSquareBottomRight,
          northSquareTopRight,
        );
      }
    }
    // Pole triangles
    var layerBaseIndex = hemispherePointCount;
    var northPoleIndex = this.vertices.length / 3 - 2;
    for (var i = 0; i < this.slices; i++) {
      var northTriangleLeft = layerBaseIndex + i;
      if (i == this.slices - 1) {
        var northTriangleRight = layerBaseIndex;
      } else {
        var northTriangleRight = layerBaseIndex + i + 1;
      }
      this.indices.push(
        northTriangleLeft,
        northTriangleRight,
        northPoleIndex,
      );
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