import Matter from 'matter-js';
/**
 * State contains the mutable attributes (not constants)
 * Every entity has a position
 * Entity may be needed to know the id or the props to modifiy the state 
 * Physics happens here for the moment
 */
export default class BodyFactory {

    /**
     * create a circle body
     * @param  {float} radius  
     * @param  {object} options 
     * @return {Matter.Body}
     */
    static circle(entity, radius, options) {
        const pos = entity.state.position;
        const body = Matter.Bodies.circle(pos.x, pos.y, radius, options);
        body.entity = entity;
        return body;
    }

    static rectangle(entity, width, height, options) {
        const pos = entity.state.position;
        const body = Matter.Bodies.rectangle(pos.x, pos.y, width, height, options);
        body.entity = entity;
        return body;
    }
}