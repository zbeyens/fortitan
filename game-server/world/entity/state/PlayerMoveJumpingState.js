import State from './State';
import PlayerMoveState from './PlayerMoveState';
import cfg from '../../../config';


export default class PlayerMoveJumpingState extends PlayerMoveState {

    enter() {
        this.state.onGround = false;
        
        this.physics.jump();
    }

    update(delta) {
        super.update(delta);

        if (Math.abs(this.entity.physics.body.velocity.y) < 0.0001) {
            this.entity.enterStandingState();
        }
    }

}