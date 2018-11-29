import State from 'iogine/world/State';


export default class PlayerMoveWalkingStateV extends State {

    enter() {
        const frameRate = 15;
        this.entity.spriteMain.animations.play('walk', frameRate, true);
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
        this.entity.spriteMain.animations.stop('walk', true);
    }

}