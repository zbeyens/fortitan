import PhaserView from 'iogine/render/phaser/PhaserView';
import { ATLASES } from 'config/preload.config';
import { ANIMATIONS } from 'config/assets.config';
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

    const key = ATLASES.players[0];
    // this.spriteMain = this.scene.add.sprite(100, 100, key);
    this.spriteMain = this.scene.playerGroup.create(pos.x, pos.y, key);
    this.addToSprites(this.spriteMain);

    const { walk } = ANIMATIONS.players;

    const frames = this.scene.anims.generateFrameNames(key).splice(walk.offset);
    this.scene.anims.create({
      key: 'walk',
      frames,
      repeat: -1,
    });

    this.spriteMain.anims.load('walk');
  }

  initState() {
    this.enterStandingState();
  }

  update(dt) {
    super.updatePositions();
    this.moveState.update(dt);

    // TODO: follow the mouseX ?
    this.spriteMain.setFlipX(this.state.direction.x === -1);
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
