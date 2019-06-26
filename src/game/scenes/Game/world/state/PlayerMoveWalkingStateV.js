import State from 'iogine/world/State';

export default class PlayerMoveWalkingStateV extends State {
  enter() {
    // const frameRate = 15;
    this.entity.spriteMain.anims.play('walk');
  }

  update() {
    const { isMoving } = this.state;
    const { onGround } = this.state;

    if (!onGround) {
      this.exit();
      this.entity.enterJumpingState();
    } else if (!isMoving) {
      this.exit();
      this.entity.enterStandingState();
    }
  }

  exit() {
    this.entity.spriteMain.anims.stop();
  }
}
