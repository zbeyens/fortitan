import Entity from './Entity';

/**
 * StaticEntity is used for entities with a state that remains constant (e.g. Ground).
 * Thus, we say that these entities are "user-controlled" by a client.
 * These entities should not be sent over a network, since the client information is always up-to-date.
 */
export default class StaticEntity extends Entity {
	
	// constructor(id) {
	// 	super(id);
	// }

	
}
