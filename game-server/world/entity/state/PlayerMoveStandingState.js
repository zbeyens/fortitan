import PlayerMoveState from './PlayerMoveState';


export default class PlayerMoveStandingState extends PlayerMoveState {

    enter() {
        this.state.onGround = true;
        this.elapsed = 0;
    }

    handleInput(input) {
        super.handleInput(input);

        const jumpInterval = 50;
        if (input.up && this.elapsed > jumpInterval) {
            this.entity.enterJumpingState();
        }
    }

    update(dt) {
        super.update(dt);

        this.elapsed += dt;
    }

}