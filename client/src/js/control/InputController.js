/**
 * Handling the inputs
 */
export default class InputController {
    constructor(game) {
        this.game = game;
        this.keys = {
            up: game.input.keyboard.addKey(Phaser.KeyCode.UP),
            down: game.input.keyboard.addKey(Phaser.KeyCode.DOWN),
            left: game.input.keyboard.addKey(Phaser.KeyCode.LEFT),
            right: game.input.keyboard.addKey(Phaser.KeyCode.RIGHT),
            space: game.input.keyboard.addKey(Phaser.KeyCode.SPACE),
            x: game.input.keyboard.addKey(Phaser.KeyCode.X),
            a: game.input.keyboard.addKey(Phaser.KeyCode.A),
            q: game.input.keyboard.addKey(Phaser.KeyCode.Q),
            w: game.input.keyboard.addKey(Phaser.KeyCode.W),
            s: game.input.keyboard.addKey(Phaser.KeyCode.S),
            d: game.input.keyboard.addKey(Phaser.KeyCode.D),
            z: game.input.keyboard.addKey(Phaser.KeyCode.Z),
        };

        this.mouse = {
            leftClick: game.input.activePointer.leftButton,
        };

        // we don't want to scroll when pressing space bar
        window.onkeydown = (e) => {
            const spaceKeyCode = 32; 
            return !(e.keyCode === spaceKeyCode);
        };
    }

    handleInputs() {}

}