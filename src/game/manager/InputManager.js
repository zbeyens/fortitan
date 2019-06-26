import Phaser from 'phaser';

/**
 * Handling the inputs
 */
export default class InputManager {
  constructor(scene) {
    Object.assign(this, scene);

    // we don't want to scroll when pressing space bar
    window.onkeydown = e => {
      const spaceKeyCode = 32;
      return !(e.keyCode === spaceKeyCode);
    };
  }

  update() {}
}
