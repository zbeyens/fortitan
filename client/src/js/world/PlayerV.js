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

        this.initView();
        this.initState();
    }

    initView() {
        const pos = this.state.position;

        const key = cfg.atlases.players[0];
        this.spriteMain = this.game.playerGroup.create(pos.x, pos.y, key);
        this.addCenter(this.spriteMain);

        const walk = cfg.animations.players.walk;
        const walkFrames = this.getAnimationFrames(walk.nFrames, walk.offset);

        //  Create an animation called 'walk', the fact we don't specify any frames means it will use all frames in the atlas
        this.spriteMain.animations.add('walk', walkFrames);
    }

    initState() {
        this.enterStandingState();
    }

    update(dt) {
        super.updatePositions();

        this.moveState.update(dt);

        // TODO: follow the mouseX ?
        if (this.state.direction.x === -1) {
            this.spriteMain.scale.x = -1;
        } else if (this.state.direction.x === 1) {
            this.spriteMain.scale.x = 1;
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