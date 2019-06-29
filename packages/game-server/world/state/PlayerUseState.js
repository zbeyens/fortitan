import State from 'iogine/world/State';

export default class PlayerUseState extends State {
  enter() {}

  update(dt) {
    // inventory.items[usingItem].use
    const usingItem = this.entity.inventory.usingItem;

    if (usingItem) {
      usingItem.enterUseState();
    }

    this.entity.enterUseIdleState();
  }

  exit() {}
}
