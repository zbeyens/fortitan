import PhaserView from 'iogine/render/phaser/PhaserView';
import cfg from '../config';


export default class GroundV extends PhaserView {

	constructor(entity) {
		super(entity);

		const key = cfg.images.grounds[0];
		this.spriteBody = window.game.add.tileSprite(this.state.position.x, this.state.position.y, this.props.body.width, this.props.body.height, key);
		this.centerAnchor(this.spriteBody);
		window.game.platformGroup.add(this.spriteBody);
	}

}