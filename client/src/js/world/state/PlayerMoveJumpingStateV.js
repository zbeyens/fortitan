import StateV from './StateV';


export default class PlayerMoveJumpingStateV extends StateV {

    enter() {
        this.entity.spriteBody.frame = 0;
    }

    update(dt) {
        const isMoving = this.state.direction.x;
        const onGround = this.state.onGround;

        if (!isMoving && onGround) {
            this.entity.enterStandingState();
        }
        if (isMoving && onGround) {
            this.entity.enterWalkingState();
        }
    }

}