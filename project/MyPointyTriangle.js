import {CGFobject} from '../lib/CGF.js';
/**
 * MyPointyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 */

export class MyPointyTriangle extends CGFobject {
    constructor(scene, x, y, size) {
        super(scene);
        this.x = x;
        this.y = y;
        this.size = size;
        this.initBuffers();
    }
    
    initBuffers() {
        this.vertices = [
            -0.2 * this.size + this.x, 0, 0 + this.y,	//0
            0 + this.x, 1 * this.size, 0 + this.y,	//1
            0.2 * this.size + this.x, 0, 0 + this.y,	//2
        ];

        this.indices = [
            0, 1, 2,
            2, 1, 0
        ];
        this.texCoords = [
            0, 0.5,
            0, 1,
            0.5, 1
        ]

        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }
}
