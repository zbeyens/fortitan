import State from 'iogine/world/State';


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