import { CGFobject } from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';
/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad extends CGFobject {
    constructor(scene) {
        super(scene);
        this.quad = new MyQuad(this.scene);
    }

    display(){
        this.scene.pushMatrix();

        this.scene.setWhiteColour();
        
        this.scene.pushMatrix();

        this.scene.translate(6, -6, 0);
        this.scene.scale(12, 12, 12);
        this.quad.display(); // Front face

        this.scene.popMatrix();

        this.scene.pushMatrix();

        this.scene.translate(6, -6, -12);
        this.scene.rotate(Math.PI, 0, 1, 0)
        this.scene.scale(12, 12, 12);
        this.quad.display(); // Back face

        this.scene.popMatrix();

        this.scene.pushMatrix();

        this.scene.translate(6, 0, -6);
        this.scene.rotate(-Math.PI/2, 1, 0, 0)
        this.scene.scale(12, 12, 12);
        this.quad.display(); // Up face

        this.scene.popMatrix();

        this.scene.pushMatrix();

        this.scene.translate(12, -6, -6);
        this.scene.rotate(Math.PI/2, 0, 1, 0)
        this.scene.scale(12, 12, 12);
        this.quad.display(); // Right face

        this.scene.popMatrix();

        this.scene.pushMatrix();

        this.scene.translate(6, -12, -6);
        this.scene.rotate(Math.PI/2, 1, 0, 0)
        this.scene.scale(12, 12, 12);
        this.quad.display(); // Down face

        this.scene.popMatrix();

        this.scene.pushMatrix();

        this.scene.translate(0, -6, -6);
        this.scene.rotate(-Math.PI/2, 0, 1, 0)
        this.scene.scale(12, 12, 12);
        this.quad.display(); // Left face

        this.scene.popMatrix();

        this.scene.popMatrix()
    }
}