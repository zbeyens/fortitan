import { IMAGES } from 'config/preload.config';

export default class MainMenuAssets {
  constructor(scene) {
    this.scene = scene;

    const { centerX, centerY } = this.scene.cameras.main;

    this.bg = scene.add.sprite(centerX, centerY, IMAGES.mainMenuBg[0]);

    const height = 360;
    this.title = scene.add.sprite(centerX, height, IMAGES.mainMenuTitle[0]);
  }

  update() {}
}

// if (gameWidth / gameHeight > cfg.aspectRatio) {
//   this.bg.width = gameWidth;
//   this.bg.height = gameWidth / cfg.aspectRatio;
// } else {
//   this.bg.width = gameHeight * cfg.aspectRatio;
//   this.bg.height = gameHeight;
// }
