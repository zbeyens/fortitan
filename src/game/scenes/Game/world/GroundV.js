import PhaserView from 'iogine/render/phaser/PhaserView';
import { IMAGES } from 'config/preload.config';

export default class GroundV extends PhaserView {
  constructor(id, initState, initProps) {
    super(id, initState, initProps);

    const { x, y } = this.state.position;
    const { width, height } = this.props.body;
    const key = IMAGES.grounds[0];
    this.spriteMain = this.scene.make.tileSprite({ x, y, width, height, key });
    this.scene.platformGroup.add(this.spriteMain);
    this.addToSprites(this.spriteMain);
  }
}
