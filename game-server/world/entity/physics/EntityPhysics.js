

/**
 * Create the Bodies.
 * Handle the effect of collisions.
 */
export default class EntityPhysics {
    constructor(entity, engine) {
        this.entity = entity;
        this.state = entity.state;
        this.engine = engine;
    }
}