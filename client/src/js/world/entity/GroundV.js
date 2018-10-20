

export default class GroundV extends EntityV {

	constructor(entity) {
        super(entity);

        this.sprite = new Phaser.TileSprite(window.game, this.state.position.x, this.state.position.y, props.width, props.height, 'ground');
    	this.sprite.anchor.setTo(0.5);
    	window.game.platformGroup.add(this.sprite);
    }

}