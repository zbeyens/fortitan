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
        this.spriteBody = this.addSprite('atlas_players_' + this.props.atlasIndex);

        const walk = cfg.animations.players.walk;
        const walkFrames = this.getAnimationFrames(walk.nFrames, walk.offset);

        //  Create an animation called 'walk', the fact we don't specify any frames means it will use all frames in the atlas
        this.spriteBody.animations.add('walk', walkFrames);
        window.game.playerGroup.add(this.spriteBody);
    }

    initState() {
        this.enterStandingState();
    }

    update(dt) {
        super.updateSprites();

        this.moveState.update(dt);

        // TODO: follow the mouseX ?
        if (this.state.direction.x === -1) {
            this.spriteBody.scale.x = -1;
        } else {
            this.spriteBody.scale.x = 1;
        }


        // this.game.debug.spriteBounds(this);
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