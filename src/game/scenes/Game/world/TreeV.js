// import ResourceV from './ResourceV';
import PhaserView from 'iogine/render/phaser/PhaserView';
import { IMAGES } from 'config/preload.config';
import TreeHitState from './state/TreeHitState';
import TreeIdleState from './state/TreeIdleState';

export default class TreeV extends PhaserView {
  constructor(id, initState, initProps) {
    super(id, initState, initProps);

    const pos = this.state.position;
    const key = IMAGES.trees[0];
    this.spriteMain = this.scene.resourceGroup.create(pos.x, pos.y, key);
    this.addToSprites(this.spriteMain);

    this.initState();
  }

  initState() {
    this.enterHitState();
  }

  update(dt) {
    super.updatePositions(dt);

    this.actionState.update(dt);
  }

  enterIdleState() {
    this.actionState = new TreeIdleState(this);
  }

  enterHitState() {
    this.actionState = new TreeHitState(this);
  }
}
