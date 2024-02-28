import { CGFobject } from '../lib/CGF.js';
import { MyTangram } from './MyTangram.js';
import { MyUnitCube } from './MyUnitCube.js';
/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyComposition extends CGFobject {
    constructor(scene) {
        super(scene);
        this.tangram = new MyTangram(this.scene);
        this.unitcube = new MyUnitCube(this.scene);
    }

    display(){
        this.scene.popMatrix();
        this.scene.setWhiteColour();
        this.scene.pushMatrix();
        this.scene.rotate(3 * Math.PI / 2, 1, 0, 0)
        this.scene.translate(6,6, -6);
        this.scene.scale(12, 12, 12);
        this.unitcube.display();
        this.scene.popMatrix();
        this.scene.translate(5.5,-6,0.1);
        this.scene.pushMatrix();
        this.tangram.display();
    }
}