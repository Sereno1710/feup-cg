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
    this.texCoords = []; // Array to hold texture coordinates

    var angle = (2 * Math.PI) / this.slices;
    var z = 1 / this.stacks;

    // Generate side vertices, normals, and texture coordinates for cylinder
    for (var j = 0; j <= this.stacks; j++) {
        for (var i = 0; i < this.slices; i++) {
            var x1 = Math.cos(i * angle);
            var y1 = Math.sin(i * angle);

            this.vertices.push(x1, y1, z * j);
            this.normals.push(x1, y1, 0);

            // Calculate texture coordinates
            var s = i / (this.slices - 1); // Range from 0 to 1 along the x-axis
            var t = j / this.stacks; // Range from 0 to 1 along the y-axis
            this.texCoords.push(s, t);
        }
    }

    // Add vertices and normals for base and top of the cylinder
    this.vertices.push(0, 0, 0); // Center of the base
    this.normals.push(0, 0, -1); // Normal pointing downwards
    this.texCoords.push(0.5, 0.5); // Texture coordinate at the center of the base

    this.vertices.push(0, 0, 1); // Center of the top
    this.normals.push(0, 0, 1); // Normal pointing upwards
    this.texCoords.push(0.5, 0.5); // Texture coordinate at the center of the top

    // Calculate texture coordinates for the base and top
    for (var i = 0; i < this.slices; i++) {
        var x = Math.cos(i * angle);
        var y = Math.sin(i * angle);

        // Texture coordinates for the base
        var s = 0.5 + 0.5 * x;
        var t = 0.5 + 0.5 * y;
        this.texCoords.push(s, t);

        // Texture coordinates for the top
        this.texCoords.push(s, t);
    }

    // Generate indices for the sides, base, and top
    var baseIndex = 0;
    for (var j = 0; j < this.stacks; j++) {
        for (var i = 0; i < this.slices; i++) {
            if (i != this.slices - 1) {
                var bottomLeft = baseIndex;
                var bottomRight = baseIndex + 1;
                var topLeft = baseIndex + this.slices;
                var topRight = baseIndex + this.slices + 1;
            } else {
                var bottomLeft = baseIndex;
                var bottomRight = baseIndex - this.slices + 1;
                var topLeft = baseIndex + this.slices;
                var topRight = baseIndex + 1;
            }
            this.indices.push(topRight, topLeft, bottomLeft, bottomLeft, bottomRight, topRight);

            baseIndex += 1;
        }
    }

    // Indices for base and top
    for (var i = 0; i < this.slices; i++) {
        if (i != this.slices - 1) {
            var bottomLeft = baseIndex;
            var bottomRight = baseIndex + 1;
        } else {
            var bottomLeft = baseIndex;
            var bottomRight = baseIndex - this.slices + 1;
        }
        // Base indices
        this.indices.push(bottomLeft, bottomRight, this.vertices.length / 3 - 2);
        // Top indices
        this.indices.push(this.vertices.length / 3 - 1, bottomLeft + this.slices, bottomRight);
        baseIndex += 1;
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
