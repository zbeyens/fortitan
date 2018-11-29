import State from 'iogine/world/State';


export default class PlayerMoveStandingStateV extends State {

    enter() {
        this.entity.spriteMain.frame = 1;
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