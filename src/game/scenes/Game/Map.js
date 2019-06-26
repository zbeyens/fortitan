import PhaserView from 'iogine/render/phaser/PhaserView';
import { IMAGES } from 'config/preload.config';
import { WORLD_CS } from '@fortitan/shared/config/world.csconfig';
import { gui } from 'config/debug.config';
// import EntityV from '../entity/'

/**
 * Handling the decor: background, collision-free sprites...
 */
export default class Map extends PhaserView {
  constructor(scene) {
    super();

    this.scene = scene;

    const key = IMAGES.bg[0];
    const { width } = WORLD_CS.bounds;
    const { height } = WORLD_CS.bounds;
    this.bg = this.scene.make.tileSprite({
      x: width / 2,
      y: height / 2,
      width,
      height,
      key,
    });
    this.scene.backgroundGroup.add(this.bg);

    gui.f1 = gui.addFolder('Map');
    gui.f1.add(this.bg, 'height', 100, 2000).step(100);
  }

  update(dt) {
    // console.log(this.scene.sys.displayList);
    // this.bg.position = {
    //     x: this.game.width / 2,
    //     y: this.game.height / 2,
    // };
    // this.bg.scale.setTo(scale_ratio);
    // this.bg.width = window.innerWidth;
    // this.bg.height = window.innerHeight;
    //
    // const { selfPlayer } = this.game.gameEngine;
    // if (!selfPlayer) return;
    // this.bg.tilePosition.setTo(selfPlayer.state.position.x, selfPlayer.state.position.y);
  }
}
