import { WORLD_CS } from '@fortitan/shared/config/world.csconfig';

export default class CameraManager {
  constructor(scene) {
    Object.assign(this, scene);

    this.cameras.main.setBounds(
      0,
      0,
      WORLD_CS.bounds.width * WORLD_CS.bounds.scale,
      WORLD_CS.bounds.height * WORLD_CS.bounds.scale
    );
  }

  update() {
    const playerToFollow = this.gameEngine.selfPlayer;
    if (!playerToFollow || playerToFollow.target) return;

    const lerp = 0.1;
    const cam = this.cameras.main;
    cam.startFollow(playerToFollow.spriteMain, false, lerp, lerp);

    this.target = true;
  }
}
