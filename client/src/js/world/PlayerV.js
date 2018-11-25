import PhaserView from 'iogine/render/phaser/PhaserView';
import cfg from '../config';
import PlayerMoveStandingStateV from './state/PlayerMoveStandingStateV';
import PlayerMoveWalkingStateV from './state/PlayerMoveWalkingStateV';
import PlayerMoveJumpingStateV from './state/PlayerMoveJumpingStateV';
// import PlayerActionIdleStateV from './state/PlayerActionIdleStateV';
// import PlayerActionHittingStateV from './state/PlayerActionHittingStateV';


export default class PlayerV extends PhaserView {

    constructor(id, initState, initProps) {
        super(id, initState, initProps);

        console.log(this);
        this.initView();
        this.initState();
    }

    initView() {
        this.spriteBody = this.addSprite(this.state.position, cfg.atlases.players[0]);

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
        } else if (this.state.direction.x === 1) {
            this.spriteBody.scale.x = 1;
        }
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