import InputManager from '../../managers/InputManager';

export default class MainMenuController extends InputManager {
  constructor(scene) {
    super(scene);

    this.keys = scene.input.keyboard.addKeys('SPACE');
  }

  /**
   * Start GameScene when X is down
   */
  update() {
    if (this.keys.SPACE.isDown) {
      this.scene.start('GameScene');
    }
  }
}
