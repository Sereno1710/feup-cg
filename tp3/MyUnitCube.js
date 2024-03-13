import {CGFobject} from '../lib/CGF.js';
/**
 * MyUnitCube
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
			-0.5, -0.5, -0.5, //0
            -0.5, -0.5, 0.5,  //1
            -0.5, 0.5 , -0.5, //2 
            -0.5, 0.5 , 0.5,   //3 
            0.5, -0.5, -0.5,  //4  
            0.5, 0.5 , -0.5,   //5 
            0.5, -0.5, 0.5,   //6  
            0.5, 0.5 , 0.5,    //7 
            -0.5, -0.5, -0.5, //0B
            -0.5, -0.5, 0.5,  //1B
            -0.5, 0.5 , -0.5, //2B
            -0.5, 0.5 , 0.5,   //3B
            0.5, -0.5, -0.5,  //4B
            0.5, 0.5, -0.5,   //5B 
            0.5, -0.5, 0.5,   //6B
            0.5, 0.5, 0.5,    //7B
            -0.5, -0.5, -0.5, //0C
            -0.5, -0.5, 0.5,  //1C
            -0.5, 0.5 , -0.5, //2C
            -0.5, 0.5 , 0.5,   //3C
            0.5, -0.5, -0.5,  //4C
            0.5, 0.5 , -0.5,   //5C
            0.5, -0.5, 0.5,   //6C
            0.5, 0.5 , 0.5,    //7C

		];
        this.normals = [
            // Normals for the vertices
            0, 0, -1,  //0B
            0, 0, 1,   //1B
            0, 1, 0,   //2B
            0, 1, 0,   //3B
            0, 0, -1,  //4B
            0, 1, 0,   //5B 
            0, 0, 1,   //6B
            0, 1, 0,   //7B
            -1, 0, 0,  //0C
            -1, 0, 0,  //1C
            -1, 0, 0,  //2C
            -1, 0, 0,  //3C
            1, 0, 0,   //4C
            1, 0, 0,   //5C
            1, 0, 0,   //6C
            1, 0, 0,   //7C
            0, -1, 0,  //0D
            0, -1, 0,  //1D
            0, 0, -1,  //2D
            0, 0, 1,  //3D
            0, -1, 0,  //4D
            0, 0, -1,  //5D
            0, -1, 0,  //6D
            0, 0, 1,  //7D
        ];
        this.indices = [

            0,4,1, // front left 

            4,6,1, // front right

            7,6,4, // right left

            4,5,7, // right right

            1,2,0, // left left 

            1,3,2, // left right

            4,0,2, // bottom left

            5,4,2,// bottom right
            
            2,7,5, // back right

            3,7,2, // back left

            7,3,6, // top right

            3,1,6, // top left

        ];  

		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
    }
}