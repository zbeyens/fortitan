import StateV from './StateV'


export default class PlayerMoveWalkingStateV extends StateV {

    enter() {
        this.entity.sprite.animations.play('walk', 15, true);
    }

    update(dt) {
        const isMoving = this.state.direction.x;
        const onGround = this.state.onGround;

        if (!onGround) {
            this.exit();
            this.entity.enterJumpingState();
        } else {
            if (!isMoving) {
                this.exit();
                this.entity.enterStandingState();
            }
        }
    }

    exit() {
        this.entity.sprite.animations.stop('walk', true);
    }

}