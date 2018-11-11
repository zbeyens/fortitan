import InputManager from '../control/InputManager';
import MainMenuAssets from '../asset/MainMenuAssets';

/**
 * Background with the title image.
 * Press X to play.
 */
export default class MainMenuScene extends Phaser.State {

    create() {
        this.inputManager = new InputManager(this.game);
        this.assets = new MainMenuAssets(this.game);
    }

    update(game) {
        const dt = game.time.elapsed;

        this.inputManager.handleMainMenuScene();
        this.assets.update(dt);
    }
}