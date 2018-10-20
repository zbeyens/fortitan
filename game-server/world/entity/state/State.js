export default class State {
	
	constructor(entity) {
		this.entity = entity;
		this.state = entity.state;
		this.physics = entity.physics;

		this.enter();
	}

	enter() {}

	handleInput(input) {}

	update(dt) {}

	exit() {}
	
}