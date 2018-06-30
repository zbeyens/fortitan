import State from './State';

export default class PlayerActionIdleState extends State {

	constructor(state) {
		super(state);
		this.state.hitting = true;

		this.renderOnce();
	}

	handleInput(input) {
		if (input.hit) {
            this.state.actionState = this.state.getActionHittingState(this.state);
        }
	}

	renderOnce() {
		const view = this.state.entity.view;
		view.alpha = 1;
	}

}