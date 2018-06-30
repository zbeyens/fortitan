import Matter from 'matter-js';
/**
 * State contains the mutable attributes (not constants)
 * Every entity has a position
 * Entity may be needed to know the id or the props to modifiy the state 
 * Physics happens here for the moment
 */
export default class EntityState {
    constructor(entity, { x, y }, engine) {
        this.entity = entity;
        this.engine = engine;

        this.x = x;
        this.y = y;
    }

    createCircleBody(radius, isStatic) {
        const category = this.entity.props.category;
        const mask = this.entity.props.mask;
        this.body = Matter.Bodies.circle(this.x, this.y, radius, {
            isStatic,
            inertia: Infinity,
            collisionFilter: {
                category: category,
                mask: mask
            },
        });
        this.body.entity = this.entity;
        Matter.World.add(this.engine.world, this.body);
    }
}