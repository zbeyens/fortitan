import ccfg from './config/'

/**
 * Handling the decor: background, collision-free sprites...
 */
export default class Map {
    constructor(state) {
    	this.bg = new Phaser.TileSprite(window.game, 0, 0, ccfg.bgWidth, ccfg.bgHeight, ccfg.bgKey);
     //    this.bg.tint = 0x0094FF;
    	// this.bg = state.add.sprite(0, 0, 'background');
    	// this.bg.scale.setTo(2);
        this.bg.scale.setTo(ccfg.bgScale);

        window.game.world.setBounds(0, 0, ccfg.bgWidth * ccfg.bgScale, ccfg.bgHeight * ccfg.bgScale);

        window.game.backgroundGroup.add(this.bg);
    }
}