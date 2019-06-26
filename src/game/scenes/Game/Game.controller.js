import InputManager from '../../manager/InputManager';

export default class GameController extends InputManager {
  constructor(scene) {
    super(scene);

    this.keys = scene.input.keyboard.addKeys(
      'UP,DOWN,LEFT,RIGHT,SPACE,X,A,Q,W,S,D,Z'
    );

    this.mouse = {
      leftClick: scene.input.activePointer.leftButton,
    };
  }

  /**
   * Handle inputs of the GameScene
   * TODO: only send the input changes. Meanwhile, send all the inputs.
   */
  update() {
    this.up = this.keys.UP.isDown || this.keys.W.isDown || this.keys.Z.isDown;
    this.down = this.keys.DOWN.isDown || this.keys.S.isDown;
    this.left =
      this.keys.LEFT.isDown || this.keys.A.isDown || this.keys.Q.isDown;
    this.right = this.keys.RIGHT.isDown || this.keys.D.isDown;
    // this.hit = this.mouse.leftClick.isDown || this.keys.SPACE.isDown;
    this.hit = this.keys.SPACE.isDown;

    this.clientEngine.sendInput('move', this);
  }
}
