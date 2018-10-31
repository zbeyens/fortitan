

/**
 * Every identifiable object is an Entity
 * Every Entity has a props (immutable properties) and a state (mutable properties).
 */
export default class Entity {
	
	constructor(id) {
		this.id = id;
	}

	update(dt) {}
	
}
