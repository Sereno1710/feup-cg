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
        this.generateGrass();
    }

    generateGrass() {
        for (let i = 0; i < this.numBlades; i++) {
            let x = (Math.random() - 0.5) * 50; 
            let z = (Math.random() - 0.5) * 50; 
            let width = 0.1;
            let rotation = Math.random() * Math.PI; 
            let blade = new MyPointyTriangle(this.scene, 0, 0, Math.random() * 2 + 1);
            this.blades.push({ blade, x, z,  width, rotation });
        }
    }

    display() {
        for(let blade of this.blades) {
            blade.display();
        }
    }
}