import cfg from '../config';


/**
 * Setup the pre-game boot sequence.
 * Scene loading all the assets: image, atlas, sounds,...
 */
export default class PreloaderScene extends Phaser.State {

    init() {}

    /**
     * Preload any assets needed for the main menu state.
     */
    preload() {
        // Images

        this.load.image('inventoryBar', 'img/InventoryBar1.png');

        this.load.image('title-background', 'img/icons/bg-2.png');
        this.load.image('title', 'img/title.png');

        // this.load.image('p1_walk', 'img/temp/p1_walk.png');
        this.load.image('tree2', 'img/tree/Asset 1.png');
        this.load.image('stone', 'img/tiles/Spring/256x256/GrassJoinHillRight2&Left2 DownShadow.png');
        this.load.image(cfg.bg.key, cfg.bg.url);
        this.load.image('pickaxe', 'img/SpriteWay/StonePick.png');
        this.load.image('ground', 'img/tiles/Spring/128x128/GrassMid.png');

        // preload all textures from the config where key = imageType + entityType + index (e.g. 'imagePlayers0')
        for (const textureType of Object.keys(cfg.textures)) {
            const textureList = cfg.textures[textureType];

            for (let i = 0; i < textureList.length; i++) {
                const key = 'image_' + textureType + '_' + i;
                const url = textureList[i];

                this.load.image(key, url);
            }
        }

        // Beginning of an atlas to replace spritesheets
        for (const atlasType of Object.keys(cfg.atlases)) {
            const atlasList = cfg.atlases[atlasType];

            for (let i = 0; i < atlasList.length; i++) {
                const key = 'atlas_' + atlasType + '_' + i;
                const url = atlasList[i];

                this.load.atlas(key, url + '.png', url + '.json');
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
    }

    /**
     * Move on to the main menu state.
     */
    create() {
        console.log("Loading complete...");
        this.state.start('MainMenuScene');
    }
}