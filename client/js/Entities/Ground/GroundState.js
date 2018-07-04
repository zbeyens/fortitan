import Matter from 'matter-js';
import ccfg from '../../config';
import EntityState from '../EntityState'

export default class GroundState extends EntityState {

	constructor(entity, state, engine) {
		super(entity, state, engine);

		this.body = this.rectangle(entity.props.width, entity.props.height, ccfg.ground.bodyOptions);
        Matter.World.add(this.engine.world, this.body);
	}
	
}
