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
        for (let i = 0; i < this.numBlades; i++) {
            this.scene.pushMatrix();
            this.scene.translate(this.blades[i].x, 0, this.blades[i].z);
            this.scene.scale(0.3,0.8,0.3);
            this.scene.rotate(this.blades[i].rotation, 0, 1, 0);
            this.scene.setGrassAppearance();
            this.blades[i].blade.display();
            this.scene.popMatrix();
        }
    }
}