import InputManager from '../InputManager'

/**
 * Background with the title image.
 * Press X to play.
 */
class MainMenuScene extends Phaser.State {
       
    create() {
        this.bg = this.add.sprite(0, 0, 'title-background');

        this.title = this.add.sprite(this.game.config.width / 2, 100, 'title');
        this.title.anchor.setTo(0.5);
        this.inputManager = new InputManager(this.game); 
    }

    update(time, delta) {
       this.inputManager.handleTitle();
    }
}

export default MainMenuScene;