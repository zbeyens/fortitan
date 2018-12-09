import State from "iogine/world/State";
import cfg from "../../config";

export default class PlayerUseState extends State {
  enter() {}

  update(delta) {
    // inventory.items[usingItem].use
    const usingItem = this.entity.inventory.usingItem;

    if (usingItem) {
      usingItem.enterUseState();
    }

    this.entity.enterUseIdleState();
  }

  exit() {}
}
