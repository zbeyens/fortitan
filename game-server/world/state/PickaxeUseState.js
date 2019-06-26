import State from 'iogine/world/State';
import { BODY_ENTITIES } from '../../config/physics.config';

export default class PickaxeUseState extends State {
  enter() {
    this.timeElapsed = 0;
    this.state.using = true;
  }

  update(dt) {
    this.timeElapsed += dt;

    this.state.angle += BODY_ENTITIES.pickaxes.useAngleFactor * dt;

    if (this.timeElapsed > BODY_ENTITIES.pickaxes.useTime) {
      this.exit();
      this.entity.enterUseIdleState();
    }
  }

  exit() {
    this.state.using = false;
    this.state.angle = BODY_ENTITIES.pickaxes.idleAngle;
  }
}
