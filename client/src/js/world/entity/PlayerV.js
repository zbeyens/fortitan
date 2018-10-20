import EntityV from './EntityV';
import cfg from '../../config';
// import PlayerActionIdleStateV from './state/PlayerActionIdleStateV';
// import PlayerActionHittingStateV from './state/PlayerActionHittingStateV';
import PlayerMoveStandingStateV from './state/PlayerMoveStandingStateV';
import PlayerMoveWalkingStateV from './state/PlayerMoveWalkingStateV';
import PlayerMoveJumpingStateV from './state/PlayerMoveJumpingStateV';

export default class PlayerV extends EntityV {

    constructor(entity) {
        super(entity);

        this.initView();
        this.initState();
    }

    initView() {
        this.addSprite();

        const framesWalk = [];
        for (var i = 0; i < 11; i++) {
            framesWalk.push(2 + i);
        }
        //  Create an animation called 'walk', the fact we don't specify any frames means it will use all frames in the atlas
        this.sprite.animations.add('walk', framesWalk);
        window.game.playerGroup.add(this.sprite);
    }

    initState() {
        this.enterStandingState();

    }

    update(dt) {
        super.update(dt);

        this.moveState.update(dt);

        // this.game.debug.spriteBounds(this);

        const isMoving = this.state.direction.x;
        const onGround = this.state.onGround;

        // TODO: follow the mouseX ?
        if (this.state.dirLeft) {
            this.sprite.scale.x = -1;
        } else {
            this.sprite.scale.x = 1;
        }
        // this.state.actionState.render(this);
    }

    enterStandingState() {
        this.moveState = new PlayerMoveStandingStateV(this);
    }

    enterWalkingState() {
        this.moveState = new PlayerMoveWalkingStateV(this);
    }

    enterJumpingState() {
        this.moveState = new PlayerMoveJumpingStateV(this);
    }

    enterActionIdleState() {
        // this.moveState = new PlayerActionIdleStateV(this);
    }

    enterActionHittingState() {
        // this.moveState = new PlayerActionHittingStateV(this);
    }
}