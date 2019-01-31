import State from 'iogine/world/State';

export default class PlayerMoveJumpingStateV extends State {
  enter() {
    this.entity.spriteMain.frame = 0;
  }

  update(dt) {
    const isMoving = this.state.isMoving;
    const onGround = this.state.onGround;

    if (!isMoving && onGround) {
      this.entity.enterStandingState();
    }
    if (isMoving && onGround) {
      this.entity.enterWalkingState();
    }
  }
}
