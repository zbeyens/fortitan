import PhaserView from 'iogine/render/phaser/PhaserView';
import { IMAGES } from 'config/preload.config';

export default class PickaxeV extends PhaserView {
  constructor(id, initState, initProps) {
    super(id, initState, initProps);

    const pos = this.state.position;
    const key = IMAGES.pickaxes[0];
    this.spriteMain = this.scene.add.sprite(pos.x, pos.y, key);
    this.scene.itemGroup.add(this.spriteMain);
    this.addToSprites(this.spriteMain);

    this.initState();
  }

  initState() {
    this.state.dirX = 1;
  }

  update(dt) {
    // super.updatePositions(dt);

    const ownerState = this.state.owner.state;

    if (ownerState.direction.x === 1) {
      this.state.dirX = true;
    } else if (ownerState.direction.x === -1) {
      this.state.dirX = false;
    }
    this.spriteMain.setFlipX(this.state.dirX);

    const offset = {
      x: 50,
      y: -10,
    };
    this.spriteMain.position = {
      x: ownerState.position.x + ownerState.direction.x * offset.x,
      y: ownerState.position.y + offset.y,
    };
  }
}
