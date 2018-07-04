
/**
 * Handling the decor: background, collision-free sprites...
 */
export default class Map {
    constructor(state) {
    	this.bg = state.add.tileSprite(0, 0, 10000, 512, 'background');
     //    this.bg.tint = 0x0094FF;
    	// this.bg = state.add.sprite(0, 0, 'background');
    	this.bg.scale.setTo(2);
        // this.bg.scale.setTo(0.5);
    }
}