import Background from '../world/map/Background';
import Camera from '../camera/Camera';
import InputManager from '../control/InputManager';
import Hud from '../ui/Hud';
// import cfg from '../config';


/**
 * Setup and display the main game state.
 */
class GameScene extends Phaser.State {

    create() {
        this.clientEngine = this.game.clientEngine;
        this.gameEngine = this.clientEngine.gameEngine;

        this.game.backgroundGroup = this.game.add.group();
        this.game.resourceGroup = this.game.add.group();
        this.game.buildingGroup = this.game.add.group();
        this.game.platformGroup = this.game.add.group();
        this.game.playerGroup = this.game.add.group();
        this.game.itemGroup = this.game.add.group();
        this.game.hudGroup = this.game.add.group();

        this.background = new Background(this);
        this.camera = new Camera(this.game);
        this.hud = new Hud();

        this.inputManager = new InputManager(this.clientEngine);

        this.gameEngine.createLevel();
    }

    /**
     * Update loop
     * @param  {float} time  from the beginning of the scene
     * @param  {float} delta time between 2 updates
     */
    update(game) {
        if (this.gameEngine.selfPlayer && !this.game.camera.target) {
            this.camera.followPlayer(this.gameEngine.selfPlayer);
        }
        const dt = game.time.elapsed;

        this.inputManager.handleGameScene();

        this.clientEngine.step(0, dt);

        const debugDim = 32;
        this.game.debug.cameraInfo(this.game.camera, debugDim, debugDim);

        // if (!selfPlayer) return;
        // this.hud.update(selfPlayer);
        
        // this.game.debug.camera(this.game.camera);
        // this.game.debug.inputInfo(32, 600);
        // this.game.debug.scale(32, 600);
    }

}

export default GameScene;

// this.level = new Level(this);
