import { CGFobject } from "../lib/CGF.js";
/**
 * MySphere
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - Number of slices
 * @param stacks - Number of stacks
 */
export class MySphere extends CGFobject {
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

    var delta_alpha = Math.PI / 2 / this.stacks;
    var delta_beta = (2 * Math.PI) / this.slices;

    var equatorVertices = [];
    var equatorNormals = [];
    var equatorTexCoords = [];

    var northVertices = [];
    var northNormals = [];
    var northTexCoords = [];

    var southVertices = [];
    var southNormals = [];
    var southTexCoords = [];

    for (var i = 0; i <= this.stacks; i++) {
      for (var j = 0; j <= this.slices; j++) {
        var alpha = i * delta_alpha;
        var beta = j * delta_beta;

        var x1 = Math.sin(beta) * Math.cos(alpha);
        var y1 = Math.sin(alpha);
        var z1 = Math.cos(beta) * Math.cos(alpha);

        var u = (this.slices - j) / this.slices;
        var v = (this.stacks - i) / this.stacks;

        if (i == 0) {
          // We want the hemispheres to share the equator coordinates to make it smoother
          // So, on the first iteration, only one vertice is added per loop
          equatorVertices.push(x1, y1, z1);
          equatorNormals.push(-x1, -y1, -z1);

          equatorTexCoords.push(u, 0.5);
        } else {
          // All other iterations we add a vertice to the north hemisphere and the mirrored vertice to the south hemisphere
          northVertices.push(x1, y1, z1);
          northNormals.push(-x1, -y1, -z1);
          southVertices.push(x1, -y1, z1);
          southNormals.push(-x1, y1, -z1);

          northTexCoords.push(u, v / 2);
          southTexCoords.push(u, 1 - v / 2);
        }
      }
    }

    // Equator
    this.vertices = this.vertices.concat(equatorVertices);
    this.normals = this.normals.concat(equatorNormals);
    this.texCoords = this.texCoords.concat(equatorTexCoords);

    // North Hemisphere
    this.vertices = this.vertices.concat(northVertices);
    this.normals = this.normals.concat(northNormals);
    this.texCoords = this.texCoords.concat(northTexCoords);

    // South Hemisphere
    this.vertices = this.vertices.concat(southVertices);
    this.normals = this.normals.concat(southNormals);
    this.texCoords = this.texCoords.concat(southTexCoords);

    // If there's n slices, there's n+1 points in a layer in order to close the texture
    // If we didn't want to add a texture to the sphere, we could just loop back to the first point
    var layerVertexCount = this.slices + 1; 
    var hemispherePointCount = this.stacks * (this.slices + 1);
    for (var i = 0; i < this.stacks; i++) {
      var layerBaseIndex = i * layerVertexCount;
      for (var j = 0; j < this.slices; j++) {
        // this.vertices = [Equator Layer, North Layer 1, ..., North Layer n, South Layer 1, ..., South Layer n]
        // Each layer has layerVertexCount vertices
        // We calculate the coordinates of each square based on that
        var northSquareBottomLeft = layerBaseIndex + j;
        var northSquareTopLeft = layerBaseIndex + layerVertexCount + j;
        var northSquareBottomRight = layerBaseIndex + j + 1;
        var northSquareTopRight = layerBaseIndex + layerVertexCount + j + 1;

        var southSquareBottomLeft = northSquareTopLeft + hemispherePointCount;
        var southSquareBottomRight = northSquareTopRight + hemispherePointCount;
        if (i == 0) {
          // Share the equator with the north hemisphere, so no mirroring
          var southSquareTopLeft = northSquareBottomLeft;
          var southSquareTopRight = northSquareBottomRight;
        } else {
          var southSquareTopLeft = northSquareBottomLeft + hemispherePointCount;
          var southSquareTopRight =
            northSquareBottomRight + hemispherePointCount;
        }

        this.indices.push(
          northSquareBottomRight,
          northSquareBottomLeft,
          northSquareTopRight,

          southSquareTopLeft,
          southSquareTopRight,
          southSquareBottomLeft
        );
        // If it's not the last stack, make it a square
        if (i != this.stacks - 1) {
          this.indices.push(
            northSquareTopLeft,
            northSquareTopRight,
            northSquareBottomLeft,

            southSquareBottomRight,
            southSquareBottomLeft,
            southSquareTopRight
          );
        }
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
