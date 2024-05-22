import {CGFinterface, dat} from '../lib/CGF.js';

/**
* MyInterface
* @constructor
*/
export class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        
        // init GUI. For more information on the methods, check:
        // https://github.com/dataarts/dat.gui/blob/master/API.md
        this.gui = new dat.GUI();

        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');
        //Slider element in GUI
        this.gui.add(this.scene, 'scaleFactor', 0.1, 5).name('Scale Factor');
        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayFlower').name('Display Flower');
        var garden = this.gui.addFolder('Garden');
        garden.add(this.scene, 'displayGarden').name('Display Garden');
        garden.add(this.scene, 'rows', 1, 5).name('Rows').step(1).onChange(this.scene.updateGarden.bind(this.scene));     
        garden.add(this.scene, 'cols', 1, 5).name('Columns').step(1).onChange(this.scene.updateGarden.bind(this.scene));

        this.gui.add(this.scene, 'displayRock').name('Display Rock');
        this.gui.add(this.scene, 'displayRockSet').name('Display Rock Set');
        var bee = this.gui.addFolder('Bee');
        bee.add(this.scene, 'displayBee').name('Display Bee');
        bee.add(this.scene, 'BeeScaleFactor', 0.5, 3).name('Bee Scale Factor');
        bee.add(this.scene, 'speedFactor', 0.1, 3).name('Bee Speed Factor');
        this.initKeys();
        return true;
    }

    initKeys() {
            this.scene.gui=this;
            this.processKeyboard=function(){};
            this.activeKeys={};
    }

    processKeyDown(event) {
            this.activeKeys[event.code]=true;
    };


    processKeyUp(event) {
            this.activeKeys[event.code]=false;
    };


    isKeyPressed(keyCode) {
            return this.activeKeys[keyCode] || false;
    }
}