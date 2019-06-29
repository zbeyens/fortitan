import Map from './Map';
import Hud from './Hud';

export default class GameAssets {
  constructor(scene) {
    this.scene = scene;
    this.map = new Map(this.scene);
    // this.hud = new Hud(this.scene);
  }

  update(dt) {
    this.map.update(dt);
    // this.hud.update(dt);
  }
}
