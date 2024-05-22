import {CGFobject, CGFappearance, CGFtexture} from '../../lib/CGF.js';
import { MyPointyTriangle } from './MyPointyTriangle.js';

/**
 * MyGrass
 * @constructor
 */
export class MyGrass extends CGFobject{
    constructor(scene, numBlades) {
        super(scene);
        this.numBlades = numBlades;
        this.blades = [];
        this.blade = new MyPointyTriangle(this.scene, 0, 0,  3);
        this.generateGrass();
        this.initAppearance();
    }

    initAppearance() {
        this.grassAppearance = new CGFappearance(this.scene);
        this.grassAppearance.setAmbient(1, 1, 1, 1.0);
        this.grassAppearance.setDiffuse(0.7, 0.7, 0.7, 1);
        this.grassAppearance.setSpecular(0.0, 0.0, 0.0, 1);
        this.grassAppearance.setShininess(10);
        this.grassAppearance.loadTexture('images/texturegrass.png');
        this.grassAppearance.setTextureWrap('REPEAT', 'REPEAT');
    }
    generateGrass() {
        for (let i = 0; i < this.numBlades; i++) {
            let x = (Math.random() - 0.5) * 50; 
            let z = (Math.random() - 0.5) * 50; 
            let rotation = Math.random() * 2* Math.PI; 
            this.blades.push({blade : this.blade, x : x, z : z, rotation : rotation});
        }
    }

    display() {
        this.scene.pushMatrix();
        for (let i = 0; i < this.numBlades; i++) {
            this.scene.pushMatrix();
            this.scene.translate(this.blades[i].x, 0, this.blades[i].z);
            this.scene.scale(0.1,0.5,0.1);
            this.scene.rotate(this.blades[i].rotation, 0, 1, 0);
            this.grassAppearance.apply();
            this.blades[i].blade.display();
            this.scene.popMatrix();
        }
        this.scene.popMatrix();
    }
}