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