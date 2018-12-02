

/**
 * Inventory contains a limited set of items
 * TODO: limit
 */
export default class Inventory {
    constructor(entity) {
        this.entity = entity;
        
        this.items = [];
        this.limit = 10;
    }
    
    add(item) {
        item.state.owner = this.entity;
        this.items.push(item);
    }
    
    // TODO: removeItem
    remove(item) {
        item.state.owner = null;
    }
}