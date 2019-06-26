import Phaser from 'phaser';
import MainMenuController from './MainMenu.controller';
import MainMenuAssets from './MainMenu.assets';

/**
 * Background with the title image.
 * Press X to play.
 */
export default class MainMenuScene extends Phaser.Scene {
  create() {
    this.inputController = new MainMenuController(this);
    this.assets = new MainMenuAssets(this);
  }

  update(t, dt) {
    this.inputController.update();
    this.assets.update(dt);
  }
}
