export default class StateV {
	constructor(entity) {
		this.entity = entity;
		this.state = entity.state;

		this.enter();
	}

	enter() {}

	update(dt) {}

	exit() {}
}