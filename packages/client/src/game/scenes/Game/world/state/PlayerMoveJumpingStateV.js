import State from 'iogine/world/State';
import { FRAMES } from 'config/preload.config';

export default class PlayerMoveJumpingStateV extends State {
  enter() {
    this.entity.spriteMain.setFrame(FRAMES.players.jump);
  }

  update() {
    const { isMoving } = this.state;
    const { onGround } = this.state;

    if (!isMoving && onGround) {
      this.entity.enterStandingState();
    }
    if (isMoving && onGround) {
      this.entity.enterWalkingState();
    }
  }
}
