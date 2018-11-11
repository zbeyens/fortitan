import Matter from 'matter-js';
import EntityState from '../EntityState';
import BodyFactory from '../../../physics/BodyFactory';
import cfg from '../../../config';

export default class GroundState extends EntityState {

	constructor(entity, state, engine) {
		super(entity, state, engine);

		this.body = BodyFactory.rectangle(this, entity.props.width, entity.props.height, cfg.ground.bodyOptions);
        Matter.World.add(this.engine.world, this.body);
	}
	
}
