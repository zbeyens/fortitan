import MainMenuController from '../control/MainMenuController';
import MainMenuAssets from '../asset/MainMenuAssets';

/**
 * Background with the title image.
 * Press X to play.
 */
export default class MainMenuScene extends Phaser.State {

    create() {
        this.clientEngine = this.game.clientEngine;
        this.gameEngine = this.game.gameEngine;

        this.inputController = new MainMenuController(this.game);
        this.assets = new MainMenuAssets(this.game);
    }

    update(game) {
        const dt = game.time.elapsed;

        this.inputController.handleInputs();

        this.assets.update(dt);
    }
}