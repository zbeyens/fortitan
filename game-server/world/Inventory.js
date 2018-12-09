/**
 * Inventory contains a limited set of items
 * TODO: limit
 */
export default class Inventory {
  constructor(entity) {
    this.entity = entity;

    this.limit = 10;
    this.items = Array(this.limit).fill(0);
    this.usingItemIndex = 0;
    this.updateUsingItem();
  }

  add(item) {
    // TODO: compute availableSlotIndex
    const availableSlotIndex = 0;

    item.state.owner = this.entity;
    this.items[availableSlotIndex] = item;
    this.updateUsingItem();
  }

  updateUsingItem() {
    this.usingItem = this.items[this.usingItemIndex];
  }

  // TODO: removeItem
  remove(item) {
    item.state.owner = null;
  }
}
