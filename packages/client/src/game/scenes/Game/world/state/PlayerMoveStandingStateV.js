import State from 'iogine/world/State';
import { FRAMES } from 'config/preload.config';

export default class PlayerMoveStandingStateV extends State {
  enter() {
    this.entity.spriteMain.setFrame(FRAMES.players.stand);
  }

  update(dt) {
    const { isMoving } = this.state;
    const { onGround } = this.state;

    if (onGround) {
      if (isMoving) {
        this.entity.enterWalkingState();
      }
    } else {
      this.entity.enterJumpingState();
    }
  }
}
