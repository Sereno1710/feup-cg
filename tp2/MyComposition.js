import { CGFobject } from '../lib/CGF.js';
import { MyTangram } from './MyTangram.js';
import { MyUnitCubeQuad } from './MyUnitCubeQuad.js';
/**
 * MyComposition
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyComposition extends CGFobject {
    constructor(scene) {
        super(scene);
        this.tangram = new MyTangram(this.scene);
        this.unitCubeQuad = new MyUnitCubeQuad(this.scene);
    }

    display(){
        this.scene.pushMatrix();

        this.unitCubeQuad.display();
        this.scene.translate(5.5,-6,0.1);
        this.tangram.display();

        this.scene.popMatrix();
    }
}