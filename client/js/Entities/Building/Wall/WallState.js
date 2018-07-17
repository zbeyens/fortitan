import Matter from 'matter-js';
import EntityState from '../../EntityState'
import ccfg from '../../../config';


export default class WallState extends EntityState {

	constructor(entity, state, engine) {
		super(entity, state, engine);

		this.owner = state.owner;


		this.body = this.rectangle(ccfg.building.thickness, ccfg.tileSize, ccfg.building.bodyOptions);
        Matter.World.add(this.engine.world, this.body);
	}
	
	update(delta) {
		this.x = this.owner.state.x + ccfg.tileSize / 2;
		this.y = this.owner.state.y;

		const self = this;
		Matter.Body.setPosition(this.body, {
			x: self.x,
			y: self.y,
		});
	}

}
