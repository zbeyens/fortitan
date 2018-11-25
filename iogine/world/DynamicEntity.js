import Entity from './Entity';

/**
 * DynamicEntity is used for entities with a state that is variable (e.g. Player). 
 * These entities are serializable, and can be sent over a network.
 */
export default class DynamicEntity extends Entity {
	
	constructor(id, initState, initProps) {
		super(id, initState, initProps);

		this.netScheme = {};
	}

	
}
