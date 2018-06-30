
/**
 * Every identifiable object is an Entity
 */
export default class Entity {
	constructor(id) {
		this.id = id;
	}

	/**
	 * update the state and the view
	 */
	update(delta) {
		this.state.update(delta);
		this.view.update(delta);
	}
}
