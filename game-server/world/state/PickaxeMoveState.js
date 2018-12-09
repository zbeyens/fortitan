import State from "iogine/world/State";

export default class PickaxeMoveState extends State {
  update(dt) {
    let xOffset = 50;

    const ownerState = this.entity.state.owner.state;
    if (ownerState.direction.x === -1) {
      xOffset = -50;
    } else if (ownerState.direction.x === 1) {
      xOffset = 50;
    }

    const ownerPos = ownerState.position;

    this.entity.state.position = {
      x: ownerPos.x + xOffset,
      y: ownerPos.y
    };

    this.entity.physics.updatePosition();
  }
}
