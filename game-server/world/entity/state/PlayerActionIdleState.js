import State from './State';


export default class PlayerActionIdleState extends State {

	enter() {
		this.state.hitting = true;
	}

	handleInput(input) {
		if (input.hit) {
            this.entity.enterActionHittingState();
        }
	}

}