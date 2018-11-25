/**
 * State pattern
 * https://github.com/zbeyens/fortitan/wiki/State-Pattern
 */
export default class State {
	
	constructor(entity) {
		this.entity = entity;
		this.state = entity.state;

		this.enter();
	}

	/**
	 * Once in this state, set up the state directly.
	 */
	enter() {}

	/**
	 * Called before changing the state.
	 */
	exit() {}

	/**
	 * Update the state 
	 * @param  {Number} dt
	 */
	update(dt) {}
	
	/**
	 * Change the state from the input.
	 * Only for player-controllable entities.
	 * @param  {Object} input 
	 */
	handleInput(input) {}
}