import { CGFobject } from "../lib/CGF.js";
/**
 * MyPrism
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

    var angle = (2 * Math.PI) / this.slices;

    var z = 1 / this.stacks;
    
    for(var j =0; j < this.stacks; j++){
      for(var i = 0; i < this.slices; i++) {
        var x1 = Math.cos(i * angle);
        var y1 = Math.sin(i * angle);

        this.vertices.push(x1, y1, z*j,x1, y1, z*(j+1));
        this.normals.push(x1, y1, 0, x1, y1, 0);
      }
    }

    var baseIndex = 0;

    for(var j =0; j < this.stacks; j++){
        for(var i = 0; i < this.slices; i++) {
            if (i != this.slices-1){
                var topRight = baseIndex;
                var topLeft = baseIndex + 1;
                var bottomRight = baseIndex + 2;
                var bottomLeft = baseIndex + 3;
            } else {
                var topRight = baseIndex;
                var topLeft = baseIndex +1;
                var bottomRight = baseIndex - ((this.slices-1) * 2);
                var bottomLeft = baseIndex + 1 - ((this.slices-1) * 2);
            }
                this.indices.push(topLeft, topRight, bottomLeft, bottomLeft, topRight, bottomRight);

                baseIndex += 2;
            
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
