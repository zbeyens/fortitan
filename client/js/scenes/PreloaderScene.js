import ccfg from '../config/';


/**
 * Setup the pre-game boot sequence.
 * Scene loading all the assets: image, atlas, sounds,...
 */
export default class PreloaderScene extends Phaser.State {

    /**
     * Setup variables or objects before the preloading starts.
     */
    init() {
        // Phaser will automatically pause if the browser tab the game
        // is in loses focus. You can disable that here:
        this.stage.disableVisibilityChange = true;
    }

    /**
     * Preload any assets needed for the main menu state.
     */
    preload() {
        // Images
        
        this.load.image('inventoryBar', 'client/img/InventoryBar1.png');

        this.load.image('title-background', 'client/img/icons/bg-2.png');
        this.load.image('title', 'client/img/title.png');

        // this.load.image('p1_walk', 'client/img/temp/p1_walk.png');
        this.load.image('tree2', 'client/img/tree2.jpg');
        this.load.image('stone','client/img/stone.png');
        this.load.image('background', 'client/img/temp/bg_desert.png');
        
        // Tilemap with a lot of objects and tile-properties tricks
        // this.load.tilemap('map', 'client/assets/tilemaps/super-mario.json');

        // Spritesheet
        // I load the tiles as a spritesheet so I can use it for both sprites and tiles
        // this.load.spritesheet('tiles', 'assets/images/super-mario.png', { frameWidth: 16, frameHeight: 16 });
        // this.load.spritesheet('tiles-16bit', 'assets/images/super-mario-16bit.png', { frameWidth: 16, frameHeight: 16 });
        // Spritesheets with fixed sizes. Should be replaced with atlas:
        // this.load.spritesheet('mario', 'assets/images/mario-sprites.png', { frameWidth: 16, frameHeight: 32 });
        // this.load.spritesheet('sprites16', 'assets/images/16x16sprites.png', { frameWidth: 16, frameHeight: 16 });

        // Beginning of an atlas to replace spritesheets
        this.load.atlas(ccfg.player.keyPlayer1, ccfg.player.urlPlayer1 + '.png', ccfg.player.urlPlayer1 + '.json');

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
    }

    /**
     * Move on to the main menu state.
     */
    create() {
        console.log("Loading complete...");
        this.state.start('MainMenuScene');
    }
}