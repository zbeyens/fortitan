import State from 'iogine/world/State';
import cfg from '../../config';

export default class PickaxeMoveState extends State {
  enter() {
    this.state.angle = cfg.pickaxes.idleAngle;
  }

  update(dt) {
    let xDirection = 1;

    const ownerState = this.entity.state.owner.state;
    if (ownerState.direction.x === -1) {
      xDirection = -1;
    } else if (ownerState.direction.x === 1) {
      xDirection = 1;
    }

    const ownerPos = ownerState.position;

    const offsetRadius = cfg.pickaxes.offsetRadius;
    this.entity.state.position = {
      x: ownerPos.x + xDirection * offsetRadius * Math.cos(this.state.angle),
      y: ownerPos.y + offsetRadius * Math.sin(this.state.angle),
    };

    this.entity.physics.updatePosition();
  }
}
