import StateV from './StateV';


export default class PlayerMoveStandingStateV extends StateV {

    enter() {
        this.entity.spriteBody.frame = 1;
    }

    update(dt) {
        const isMoving = this.state.direction.x;
        const onGround = this.state.onGround;

        if (onGround) {
            if (isMoving) {
                this.entity.enterWalkingState();
            }
        } else {
            this.entity.enterJumpingState();
        }
    }

}