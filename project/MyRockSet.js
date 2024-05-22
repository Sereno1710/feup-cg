import {CGFobject, CGFappearance, CGFtexture} from '../../lib/CGF.js';
import {MyRock} from "./MyRock.js";


export class MyRockSet extends CGFobject{
    constructor(scene) {
        super(scene);
        this.rocklist = [];
        this.number = 5;
        for(let i = 0; i < this.number; i++) {
            console.log(i);
            for(let j = i; j < this.number - i; j++) {
            console.log(j);
            this.rocklist.push( new MyRock(this.scene));
            this.rocklist.push( new MyRock(this.scene));
            this.rocklist.push( new MyRock(this.scene));
            }
        }
        this.height = 0;
    }
    display() {
        this.scene.pushMatrix();
        this.scene.pushMatrix();
        let totalHeight = 0;
        let radius = 3; // Raio do círculo de rochas na base da pilha
        for(let i = 0; i < this.number*this.number; i++) {
            let angle = (i / this.number) * 2 * Math.PI; // Ângulo ao redor do círculo
            let x = radius * Math.cos(angle); // Coordenada x baseada no ângulo
            let z = radius * Math.sin(angle); // Coordenada z baseada no ângulo
            this.scene.pushMatrix();
            this.scene.translate(x, 0, z);
            this.rocklist[i].display();
            this.scene.popMatrix();
            this.scene.pushMatrix();
            this.scene.translate(1, 0, z+1);
            this.rocklist[i].display();
            this.scene.popMatrix();
            this.scene.pushMatrix();
            this.scene.translate(x, 0, 0);
            this.rocklist[i].display();
            this.scene.popMatrix();
            this.scene.pushMatrix();
            this.scene.translate(x, totalHeight, 0);
            this.rocklist[i].display();
            this.scene.popMatrix();
            this.scene.pushMatrix();
            this.scene.translate(0, totalHeight, z);
            this.rocklist[i].display();
            this.scene.popMatrix();
            this.scene.pushMatrix();
            this.scene.translate(x, totalHeight, z);
            this.rocklist[i].display();
            this.scene.popMatrix();
            
            if(i % 5 == 0 && i != 0) { // Ajuste este número para alterar quantas rochas por nível na pilha
                totalHeight += this.rocklist[i].height; 
                radius -= 0.5;
            }
        }

        this.scene.popMatrix();
        this.height = totalHeight;
    }
}