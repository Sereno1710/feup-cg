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
        this.gui.add(this.scene, 'displayGarden').name('Display Garden');
        garden.add(this.scene.garden, 'rows', 1, 5).name('Rows').onChange(this.scene.updateGardenSize.bind(this.scene)).step(1);
        garden.add(this.scene.garden, 'cols', 1, 5).name('Cols').onChange(this.scene.updateGardenSize.bind(this.scene)).step(1);
        this.gui.add(this.scene, 'displayRock').name('Display Rock');
        this.gui.add(this.scene, 'displayRockSet').name('Display Rock Set');
        return true;
    }
}