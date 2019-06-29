import Phaser from 'phaser';
import GameDebug from 'utils/Game.debug';
import CameraManager from 'game/manager/CameraManager';
import GameAssets from './Game.assets';
import GameController from './Game.controller';
import GameGroupManager from './Game.groups';

/**
 * Setup and display the main game state.
 */
export default class GameScene extends Phaser.Scene {
  create() {
    this.clientEngine = this.game.clientEngine;
    this.gameEngine = this.game.gameEngine;

    window.scene = this;

    this.groupManager = new GameGroupManager(this);

    this.gameEngine.createLevel();

    this.inputController = new GameController(this);
    this.assets = new GameAssets(this);
    this.camera = new CameraManager(this);
    this.debug = new GameDebug(this);

    console.info('Game starts...');
    this.clientEngine.sendInput('playGame');
  }

  /**
   * Update loop
   * @param  {float} time  from the beginning of the scene
   * @param  {float} delta time between 2 updates
   */
  update(t, dt) {
    this.inputController.update();

    this.clientEngine.step(dt);

    this.assets.update(dt);
    this.camera.update();

    this.groupManager.update();

    this.debug.update();
  }
}
