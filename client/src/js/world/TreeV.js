// import ResourceV from './ResourceV';
import PhaserView from 'iogine/render/phaser/PhaserView';
import cfg from '../config';
import TreeHitState from './state/TreeHitState';
import TreeIdleState from './state/TreeIdleState';

export default class TreeV extends PhaserView {

	constructor(id, initState, initProps) {
		super(id, initState, initProps);

		const pos = this.state.position;
		const key = cfg.images.trees[0];
		this.spriteMain = this.game.add.sprite(pos.x, pos.y, key);
		this.game.resourceGroup.add(this.spriteMain);
		this.addCenter(this.spriteMain);

		this.initState();
	}

	initState() {
		this.enterHitState();
	}

	update(dt) {
		super.updatePositions(dt);

		this.actionState.update(dt);
	}

	enterIdleState() {
		this.actionState = new TreeIdleState(this);
	}

	enterHitState() {
		this.actionState = new TreeHitState(this);
	}

}
