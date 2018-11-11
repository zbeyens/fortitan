import PhaserView from 'iogine/render/phaser/PhaserView';
import cfg from '../config';
// import EntityV from '../entity/'

/**
 * Handling the decor: background, collision-free sprites...
 */
export default class Map extends PhaserView {
    constructor(game) {
        super();

        this.game = game;

        const key = cfg.images.bg[0];
        const width = cfg.world.bounds.width;
        const height = cfg.world.bounds.height;
        this.bg = new Phaser.TileSprite(game, 0, 0, width, height, key);
        // this.bg.anchor.setTo(0.5);

        game.backgroundGroup.add(this.bg);
    }

    update(dt) {
        // this.bg.position = {
        //     x: this.game.width / 2,
        //     y: this.game.height / 2,
        // };
        // this.bg.scale.setTo(scale_ratio);
        // this.bg.width = window.innerWidth;
        // this.bg.height = window.innerHeight;
        
        const selfPlayer = this.game.gameEngine.selfPlayer;
        if (!selfPlayer) return;
        // this.bg.tilePosition.setTo(selfPlayer.state.position.x, selfPlayer.state.position.y);
    }
}