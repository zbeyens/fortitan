import StateV from './StateV';


export default class PlayerMoveWalkingStateV extends StateV {

    enter() {
        const frameRate = 15;
        this.entity.spriteBody.animations.play('walk', frameRate, true);
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
        this.entity.spriteBody.animations.stop('walk', true);
    }

}