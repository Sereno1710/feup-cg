import {CGFobject} from '../lib/CGF.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCube extends CGFobject {
    constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	initBuffers(){
        this.vertices = [
            // x, z ,y
			-0.5, -0.5, -0.5, //0
            -0.5, -0.5, 0.5,  //1
            -0.5, 0.5 , -0.5, //2
            -0.5, 0.5, 0.5,   //3
            0.5, -0.5, -0.5,  //4 
            0.5, 0.5, -0.5,   //5 
            0.5, -0.5, 0.5,   //6 
            0.5, 0.5, 0.5,    //7

		];

        this.indices = [

            0,4,1, // bottom left 
            1,4,0,

            4,6,1, // bottom right
            1,6,4,

            4,6,7, // right left
            7,6,4,

            4,5,7, // right right
            7,5,4, 

            0,2,1, // left left 
            1,2,0,

            2,3,1, // left right
            1,3,2,

            2,0,4, // back left
            4,0,2,

            5,4,2,// back right
            2,4,5,

            5,7,2, // top right
            2,7,5,

            3,7,2, // top left
            2,7,3,

            7,3,6, // front right
            6,3,7,

            3,1,6, // front left
            6,1,3,
        ];  

		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
    }
}