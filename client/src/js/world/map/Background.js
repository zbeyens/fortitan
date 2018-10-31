import cfg from '../../config';

/**
 * Handling the decor: background, collision-free sprites...
 */
export default class Background {
    constructor(state) {
        // TODO: You shouldn't ever create a TileSprite any larger than your actual screen size. If you want to create a large repeating background that scrolls across the whole map of your game, then you create a TileSprite that fits the screen size and then use the tilePosition property to scroll the texture as the player moves. If you create a TileSprite that is thousands of pixels in size then it will consume huge amounts of memory and cause performance issues. Remember: use tilePosition to scroll your texture and tileScale to adjust the scale of the texture - don't resize the sprite itself or make it larger than it needs.
        // NOTE: When running under WebGL the texture should ideally be a power of two in size (i.e. 4, 8, 16, 32, 64, 128, 256, 512, etc pixels width by height). If the texture isn't a power of two it will be rendered to a blank canvas that is the correct size, which means you may have 'blank' areas appearing to the right and bottom of your frame. To avoid this ensure your textures are perfect powers of two.

        this.bg = new Phaser.TileSprite(window.game, 0, 0, cfg.bg.width, cfg.bg.height, cfg.bg.key);
        // fixedToCamera = true
        //    this.bg.tint = 0x0094FF;
        // this.bg = state.add.sprite(0, 0, 'background');
        // this.bg.scale.setTo(2);
        this.bg.scale.setTo(cfg.bg.scale);

        window.game.world.setBounds(0, 0, cfg.bg.width * cfg.bg.scale, cfg.bg.height * cfg.bg.scale);

        window.game.backgroundGroup.add(this.bg);
    }
}