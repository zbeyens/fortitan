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


    /**
     * create a circle body
     * @param  {float} radius  
     * @param  {object} options 
     * @return {Matter.Body}
     */
    circle(radius, options) {
        const body = Matter.Bodies.circle(this.x, this.y, radius, options);
        body.entity = this.entity;
        return body;
    }

    rectangle(width, height, options) {
        const body = Matter.Bodies.rectangle(this.x, this.y, width, height, options);
        body.entity = this.entity;
        return body;
    }
}