import PlayerMoveState from './PlayerMoveState';
// import cfg from '../../../config';


export default class PlayerMoveJumpingState extends PlayerMoveState {

    enter() {
        this.state.onGround = false;
        
        this.entity.physics.jump();
    }

    update(delta) {
        super.update(delta);

        const vyMin = 0.0001;
        if (Math.abs(this.entity.physics.body.velocity.y) < vyMin) {
            this.entity.enterStandingState();
        }
    }

}