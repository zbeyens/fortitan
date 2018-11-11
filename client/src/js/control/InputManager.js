/**
 * Handling the inputs
 */
export default class InputManager {
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

    /**
     * Handle inputs of the GameScene
     * TODO: only send the input changes. Meanwhile, send all the inputs. 
     */
    handleGameScene() {
        this.up = this.keys.up.isDown || this.keys.w.isDown || this.keys.z.isDown;
        this.down = this.keys.down.isDown || this.keys.s.isDown;
        this.left = this.keys.left.isDown || this.keys.a.isDown || this.keys.q.isDown;
        this.right = this.keys.right.isDown || this.keys.d.isDown;
        this.hit = this.mouse.leftClick.isDown || this.keys.space.isDown;

        this.game.clientEngine.sendInput('move', this);
    }

    /**
     * Handle inputs of the MainMenuScene
     * Start GameScene
     */
    handleMainMenuScene() {
        if (this.keys.x.isDown) {
            this.game.state.start('GameScene');
        }
    }
}