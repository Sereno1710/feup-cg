import {CGFobject} from '../lib/CGF.js';
/**
 * MyParallelogram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyParallelogram extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			0, 0, 0,	//0
			2, 0, 0,	//1
			1, 1, 0,	//2
			3, 1, 0,	//3
			0, 0, 0,	//0B
			2, 0, 0,	//1B
			1, 1, 0,	//2B
			3, 1, 0		//3B
		]; 

		//Counter-clockwise reference of vertices
		this.indices = [
            0, 1, 2,
            1, 3, 2,
            2, 1, 0,
            2, 3, 1,
			6, 5, 4,
			6, 7, 5,
		];
		this.normals = [
			0,0,1,
			0,0,1,
			0,0,1,
			0,0,1,
			0,0,-1,
			0,0,-1,
			0,0,-1,
			0,0,-1
		]

		this.texCoords = [
			1,1,
			0.5,1,
			0.75,0.75,
			0.25,0.75,
			1,1,
			0.5,1,
			0.75,0.75,
			0.25,0.75,
		]
		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

