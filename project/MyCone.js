import {CGFobject} from '../lib/CGF.js';
/**
* MyCone
* @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
*/
export class MyCone extends CGFobject {
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

        var delta_alpha = 2*Math.PI/this.slices;
        var alpha = 0;

        for(var i = 0; i <= this.slices; i++){
            var x = Math.cos(alpha);
            var z = Math.sin(alpha);

            this.vertices.push(x, 0, z);
            this.normals.push(x, 0, z);
            this.texCoords.push(i/this.slices, 0);

            this.vertices.push(0, -1, 0);
            this.normals.push(0, -1, 0);
            this.texCoords.push(i/this.slices, 1);

            var currentVertex = i * 2;
            var top = currentVertex + 1;
            var nextVertex = i == this.slices ? 0 : currentVertex + 2;

            this.indices.push(currentVertex, nextVertex, top);
            
            alpha += delta_alpha;
        }


        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    /**
     * Called when user interacts with GUI to change object's complexity.
     * @param {integer} complexity - changes number of slices
     */
    updateBuffers(complexity){
        this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}


