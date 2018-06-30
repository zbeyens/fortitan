
/**
 * Handling the inputs
 */
import displayResources from './Hud'
 
export default class InputManager {
    constructor() {
        this.keys = {
            up: window.game.input.keyboard.addKey(Phaser.KeyCode.UP),
            down: window.game.input.keyboard.addKey(Phaser.KeyCode.DOWN),
            left: window.game.input.keyboard.addKey(Phaser.KeyCode.LEFT),
            right: window.game.input.keyboard.addKey(Phaser.KeyCode.RIGHT),
            space: window.game.input.keyboard.addKey(Phaser.KeyCode.SPACE),
            x: window.game.input.keyboard.addKey(Phaser.KeyCode.X),
            a: window.game.input.keyboard.addKey(Phaser.KeyCode.A),
            q: window.game.input.keyboard.addKey(Phaser.KeyCode.Q),
            w: window.game.input.keyboard.addKey(Phaser.KeyCode.W),
            s: window.game.input.keyboard.addKey(Phaser.KeyCode.S),
            d: window.game.input.keyboard.addKey(Phaser.KeyCode.D),
            z: window.game.input.keyboard.addKey(Phaser.KeyCode.Z),
        };

        this.mouse = {
            leftClick: window.game.input.activePointer.leftButton,
        };
    }

    handleGame(player) {
        this.up = this.keys.up.isDown || this.keys.w.isDown || this.keys.z.isDown;
        this.down = this.keys.down.isDown || this.keys.s.isDown;
        this.left = this.keys.left.isDown || this.keys.a.isDown || this.keys.q.isDown;
        this.right = this.keys.right.isDown || this.keys.d.isDown;
        this.hit = this.mouse.leftClick.isDown || this.keys.space.isDown;

        player.state.handleInput(this);
    }
    
    handleTitle() {
        if (this.keys.x.isDown) {
            window.game.state.start('GameScene');
        }
    }
}