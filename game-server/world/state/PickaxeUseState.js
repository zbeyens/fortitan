import State from 'iogine/world/State';
import cfg from '../../config';

export default class PickaxeUseState extends State {
  enter() {
    this.timeElapsed = 0;
    this.state.using = true;
  }

  update(dt) {
    this.timeElapsed += dt;

    this.state.angle += cfg.pickaxes.useAngleFactor * dt;

    if (this.timeElapsed > cfg.pickaxes.useTime) {
      this.exit();
      this.entity.enterUseIdleState();
    }
  }

  exit() {
    this.state.using = false;
    this.state.angle = cfg.pickaxes.idleAngle;
  }
}
