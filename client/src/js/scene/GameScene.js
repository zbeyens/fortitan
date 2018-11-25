import GameAssets from '../asset/GameAssets';
import Camera from '../camera/Camera';
import GameController from '../control/GameController';
import PhaserDebug from '../util/PhaserDebug';
import cfg from '../config';

/**
 * Setup and display the main game state.
 */
 export default class GameScene extends Phaser.State {

    create() {
        this.clientEngine = this.game.clientEngine;
        this.gameEngine = this.game.gameEngine;

        this.initGroups();
        this.initWorld();

        this.inputController = new GameController(this.game);
        this.assets = new GameAssets(this.game);
        this.camera = new Camera(this.game);
        this.debug = new PhaserDebug(this.game);

        console.log('Game starts...');
        this.clientEngine.sendInput('playGame');
    }

    /**
     * Init the groups in the rendering order
     */
     initGroups() {
        this.game.backgroundGroup = this.game.add.group();
        this.game.resourceGroup = this.game.add.group();
        this.game.buildingGroup = this.game.add.group();
        this.game.platformGroup = this.game.add.group();
        this.game.playerGroup = this.game.add.group();
        this.game.itemGroup = this.game.add.group();
        this.game.hudGroup = this.game.add.group();
    }

    initWorld() {
        this.game.world.setBounds(0, 0, cfg.world.bounds.width * cfg.world.bounds.scale, cfg.world.bounds.height * cfg.world.bounds.scale);
        this.gameEngine.createLevel();
    }

    /**
     * Update loop
     * @param  {float} time  from the beginning of the scene
     * @param  {float} delta time between 2 updates
     */
     update(game) {
        const dt = game.time.elapsed;

        this.inputController.handleInput();

        this.clientEngine.step(dt);

        this.assets.update(dt);
        this.camera.update();
        this.debug.update();        
    }

}

