import {CGFobject, CGFappearance, CGFtexture} from '../../lib/CGF.js';
import {MyRock} from "./MyRock.js";


export class MyRockSet extends CGFobject{
    constructor(scene) {
        super(scene);
        this.rocklist = [];
        this.number = Math.floor(Math.random() * 5 + 5);
        for(let i = 0; i < this.number; i++) {
            this.rocklist.push( new MyRock(this.scene, Math.random() * 10 - 5, 0, Math.random() * 10 - 8));
        }

    }
    display() {
        this.scene.pushMatrix();
        for(let i = 0; i < this.number; i++) {
            this.scene.pushMatrix();
            this.scene.setRockAppearance();
            this.rocklist[i].display();
            this.scene.popMatrix();
        }
        this.scene.popMatrix();
    }
}