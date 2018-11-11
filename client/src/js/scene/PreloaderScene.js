import cfg from '../config';


/**
 * Setup the pre-game boot sequence.
 * Scene loading all the assets: image, atlas, sounds,...
 */
export default class PreloaderScene extends Phaser.State {

    init() {}

    /**
     * Preload any assets needed for the game scene.
     */
    preload() {
        this.preloadImages();
        this.preloadAtlases();
    }

    /**
     * Load images from the config where key = url
     * NOTE: When running under WebGL the texture should ideally be a power of two in size
     * (i.e. 4, 8, 16, 32, 64, 128, 256, 512, etc pixels width by height). 
     * If the texture isn't a power of two it will be rendered to a blank canvas that is the correct size, 
     * which means you may have 'blank' areas appearing to the right and bottom of your frame. 
     * To avoid this ensure your textures are perfect powers of two.
     */
    preloadImages() {
        for (const imageType of Object.keys(cfg.images)) {
            const imageList = cfg.images[imageType];

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
        for (const atlasType of Object.keys(cfg.atlases)) {
            const atlasList = cfg.atlases[atlasType];

            for (let i = 0; i < atlasList.length; i++) {
                const url = atlasList[i];
                const key = url;

                this.load.atlas(key, url + '.png', url + '.json');
            }
        }
    }

    /**
     * Move on to the main menu state.
     */
    create() {
        console.log("Loading complete...");
        this.state.start('MainMenuScene');
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