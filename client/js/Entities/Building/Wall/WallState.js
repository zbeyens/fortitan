import Matter from 'matter-js';
import EntityState from '../../EntityState'
import ccfg from '../../../config';


export default class WallState extends EntityState {

	constructor(entity, state, engine) {
		super(entity, state, engine);

		this.owner = state.owner;

		if (this.entity.props.preview) return;

		this.body = this.rectangle(ccfg.building.thickness, ccfg.building.length, ccfg.building.bodyOptions);
        Matter.World.add(this.engine.world, this.body);
	}
	
	update(delta) {
		let dirX;

		if (Math.abs(this.owner.state.angle) <= 90) {
			dirX = 1;
		} else {
			dirX = -1;
		}

		const xReal = this.owner.state.x - ccfg.building.offsetX + dirX * ccfg.building.length / 2;
		const yReal = this.owner.state.y - ccfg.building.offsetY;
		this.x = ccfg.building.offsetX + Math.round(xReal / ccfg.building.length) * ccfg.building.length;
		this.y = ccfg.building.offsetY + Math.round(yReal / ccfg.building.length) * ccfg.building.length;
		console.log(this.x);

		console.log(this.owner.state.angle);

		if (this.entity.props.preview) return;

		const self = this;
		Matter.Body.setPosition(this.body, {
			x: self.x,
			y: self.y,
		});
	}

}
