import State from './State';
import PlayerMoveState from './PlayerMoveState'


export default class PlayerMoveStandingState extends PlayerMoveState {

    enter() {
        this.state.onGround = true;
        this.elapsed = 0;
    }

    handleInput(input) {
        super.handleInput(input);

        if (input.up && this.elapsed > 50) {
            this.entity.enterJumpingState();
        }
    }

    update(dt) {
        super.update(dt);

        this.elapsed += dt;
    }

}