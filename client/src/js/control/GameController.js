import InputController from './InputController';


export default class GameController extends InputController {

    /**
     * Handle inputs of the GameScene
     * TODO: only send the input changes. Meanwhile, send all the inputs. 
     */
    handleInputs() {
        this.up = this.keys.up.isDown || this.keys.w.isDown || this.keys.z.isDown;
        this.down = this.keys.down.isDown || this.keys.s.isDown;
        this.left = this.keys.left.isDown || this.keys.a.isDown || this.keys.q.isDown;
        this.right = this.keys.right.isDown || this.keys.d.isDown;
        this.hit = this.mouse.leftClick.isDown || this.keys.space.isDown;

        this.game.clientEngine.sendInput('move', this);
    }

}