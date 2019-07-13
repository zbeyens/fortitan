import Phaser from 'phaser';
import { IMAGES, ATLASES } from 'config/preload.config';

/**
 * Setup the pre-game boot sequence.
 * Scene loading all the assets: image, atlas, sounds,...
 */
export default class PreloaderScene extends Phaser.Scene {
  /**
   * Preload any assets needed for the game scene.
   */
  preload() {
    console.info('Preloading...');

    this.preloadImages();
    this.preloadAtlases();
  }

  /**
   * Load images from the config where key = url
   */
  preloadImages() {
    for (const imageType of Object.keys(IMAGES)) {
      const imageList = IMAGES[imageType];

      for (let i = 0; i < imageList.length; i++) {
        const url = imageList[i];
        const key = url;

        this.load.image(key, url);
      }
    }
  }

  /**
   * Load atlases from the config where key = url
   */
  preloadAtlases() {
    for (const atlasType of Object.keys(ATLASES)) {
      const atlasList = ATLASES[atlasType];

      for (let i = 0; i < atlasList.length; i++) {
        const url = atlasList[i];
        const key = url;

        this.load.atlas(key, `${url}.png`, `${url}.json`);
      }
    }
  }

  /**
   * Move on to the main menu state.
   */
  create() {
    console.info('Preloaded');
    this.scene.start('GameScene');

    this.scale.on('resize', this.resize, this);
  }

  // resize(gameSize, baseSize) {
  resize() {
    // const { width, height } = baseSize;

    this.cameras.resize(window.innerWidth, window.innerHeight);

    // this.bg.setSize(width, height);
    // this.logo.setPosition(width / 2, height / 2);

    // this.scale.setGameSize(width, height);

    // like agario
    // const w = window.innerWidth * 1.25;
    // const h = window.innerHeight * 1.25;
    // console.log('Ratio: ' + w/h);

    // this.game.width = w;
    // this.game.height = h;
    // this.state.stage.bounds.width = w;
    // this.state.stage.bounds.height = h;
    // const pw = window.innerWidth / 2;
    // const ph = window.innerHeight / 2;
    // this.stage.pivot.set(pw, ph);
    // this.stage.position.set(pw, ph);

    // 1600 / 1920 = 0.8333;
    // 500 / 1080 = 0.463;
    // to fill canvas will be 0.8333 * (1920,1080) = (1600,900) clipped top and bottom
    // const scale = Math.max(w / cfg.scopeInitX, h / cfg.scopeInitY);

    // //care of rounding...
    // const canW = tool.round(2, scale * cfg.scopeInitX);
    // const canH = tool.round(2, scale * cfg.scopeInitY);
    // if (canW > w) {
    //     this.scale = window.innerHeight / cfg.scopeInitY;
    // } else
    // if (canH > h) {
    //     this.scale = window.innerWidth / cfg.scopeInitX;
    // }
    // //no smoothing
    // this.setScaleTarget(false);

    // this.scaleY = window.innerHeight / cfg.scaleHeight; //800
  }
}

// Tilemap with a lot of objects and tile-properties tricks
// this.load.tilemap('map', 'client/assets/tilemaps/super-mario.json');

// Spritesheet
// I load the tiles as a spritesheet so I can use it for both sprites and tiles
// this.load.spritesheet('tiles', 'assets/images/super-mario.png', { frameWidth: 16, frameHeight: 16 });
// this.load.spritesheet('tiles-16bit', 'assets/images/super-mario-16bit.png', { frameWidth: 16, frameHeight: 16 });
// Spritesheets with fixed sizes. Should be replaced with atlas:
// this.load.spritesheet('mario', 'assets/images/mario-sprites.png', { frameWidth: 16, frameHeight: 32 });
// this.load.spritesheet('sprites16', 'assets/images/16x16sprites.png', { frameWidth: 16, frameHeight: 16 });

// Music to play. Need to cut it for it to loop properly
// this.load.audio('overworld', [
//     'assets/music/overworld.ogg',
//     'assets/music/overworld.mp3'
// ]);

// this.load.audioSprite('sfx', [
//     'assets/audio/sfx.ogg',
//     'assets/audio/sfx.mp3'
// ], 'assets/audio/sfx.json', {
//     instances: 4
// });

// Fonts
// this.load.bitmapFont('font', 'assets/fonts/font.png', 'assets/fonts/font.fnt');

// Load plugin for animated tiles. This is just a first build of an upcoming plugin.
// It's not optimized and lack features. The source code will be released when an
// official first version is released.
// this.load.plugin('AnimatedTiles', 'assets/plugins/AnimatedTiles.min.js');

// this.load.json('attractMode', 'assets/json/attractMode.json');
