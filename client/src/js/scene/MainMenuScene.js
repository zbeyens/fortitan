import InputManager from '../control/InputManager';


/**
 * Background with the title image.
 * Press X to play.
 */
class MainMenuScene extends Phaser.State {
       
    create() {
        this.bg = this.add.sprite(0, 0, 'title-background');

        const height = 100;
        this.title = this.add.sprite(this.game.config.width / 2, height, 'title');
        this.title.anchor.setTo(0.5);
        this.inputManager = new InputManager(this.game); 
    }

    update(time, delta) {
       this.inputManager.handleMainMenuScene();
    }
}

export default MainMenuScene;