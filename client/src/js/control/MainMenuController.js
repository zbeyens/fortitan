import InputController from './InputController';


export default class MainMenuController extends InputController {

    /**
     * Handle inputs of the MainMenuScene
     * Start GameScene
     */
    handleInput() {
        if (this.keys.x.isDown) {
            this.game.state.start('GameScene');
        }
    }

}