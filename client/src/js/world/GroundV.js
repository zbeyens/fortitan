import PhaserView from 'iogine/render/phaser/PhaserView';
import cfg from '../config';


export default class GroundV extends PhaserView {

	constructor(id, initState, initProps) {
		super(id, initState, initProps);

		const pos = this.state.position;
		const body = this.props.body;
		const key = cfg.images.grounds[0];
		this.spriteMain = this.game.add.tileSprite(pos.x, pos.y, body.width, body.height, key);
		this.game.platformGroup.add(this.spriteMain);
		this.addCenter(this.spriteMain);
	}

}