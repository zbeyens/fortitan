import { WORLD_CS } from '@fortitan/shared/config/world.csconfig';

export default class CameraManager {
  constructor(scene) {
    Object.assign(this, scene);

    this.cameras.main.setBounds(
      WORLD_CS.x,
      WORLD_CS.y,
      WORLD_CS.width * WORLD_CS.scale,
      WORLD_CS.height * WORLD_CS.scale
    );
  }

  update() {
    if (
      !this.gameEngine ||
      this.gameEngine.selfPlayer ||
      this.gameEngine.selfPlayer.target
    )
      return;

    const lerp = 0.1;
    const cam = this.cameras.main;
    cam.startFollow(this.gameEngine.selfPlayer.spriteMain, false, lerp, lerp);

    this.target = true;
  }
}
