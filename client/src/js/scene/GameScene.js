import GameAssets from '../asset/GameAssets';
import Camera from '../camera/Camera';
import InputManager from '../control/InputManager';
import cfg from '../config';

/**
 * Setup and display the main game state.
 */
 export default class GameScene extends Phaser.State {

    create() {
        this.clientEngine = this.game.clientEngine;
        this.gameEngine = this.clientEngine.gameEngine;
        this.game.gameEngine = this.clientEngine.gameEngine;

        this.initGroups();
        this.initWorld();
        
        this.inputManager = new InputManager(this.game);
        this.assets = new GameAssets(this.game);
        this.camera = new Camera(this.game);

        console.log('Game starts...');
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

        this.inputManager.handleGameScene();
        this.assets.update(dt);
        this.camera.update();

        this.clientEngine.step(0, dt);

        this.debug();        
    }

    debug() {
        const debugX = 32;
        const debugY = 600;
        if (cfg.debug.cameraInfo) {
            this.game.debug.cameraInfo(this.game.camera, debugX, debugX);
        }
        if (cfg.debug.camera) {
            this.game.debug.camera(this.game.camera);
        }
        if (cfg.debug.inputInfo) {
            this.game.debug.inputInfo(debugX, debugY);
        }
        if (cfg.debug.scale) {
            this.game.debug.scale(debugX, debugY);
        }
    }

}

