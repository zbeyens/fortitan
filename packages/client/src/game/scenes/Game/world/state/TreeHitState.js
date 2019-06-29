import Phaser from 'phaser';
import State from 'iogine/world/State';

export default class TreeHitState extends State {
  enter() {
    this.time = 0;
  }

  exit() {}

  update(dt) {
    this.time += dt;

    const shakeDuration = 200;
    if (this.time > shakeDuration) {
      this.exit();
      this.entity.enterIdleState();
      return;
    }

    const radius = 4;
    // let magnitude = this._duration / this._radius * this._radius;
    const shakeX = Phaser.Math.RND.integerInRange(-radius, radius);
    const shakeY = Phaser.Math.RND.integerInRange(-radius, radius);

    this.entity.spriteMain.position = {
      x: this.state.position.x + shakeX,
      y: this.state.position.y + shakeY,
    };
  }
}
