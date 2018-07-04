import Matter from 'matter-js';
import ResourceState from '../ResourceState';
import ccfg from '../../../config';


export default class TreeState extends ResourceState {

	constructor(entity, state, engine) {
		super(entity, state, engine);

		this.body = this.circle(ccfg.tree.bodyRadius, ccfg.tree.bodyOptions);
        Matter.World.add(this.engine.world, this.body);
	}
	
	update(delta) {

	}

}
