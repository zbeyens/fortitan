import EntityPhysics from './EntityPhysics';
import cfg from '../../config';


export default class GroundPhysics extends EntityPhysics {

    constructor(entity, physicsEngine) {
        super(entity, physicsEngine);

        const propsBody = entity.props.body;
        this.body = this.createRectangleBody(this.state.position, propsBody.width, propsBody.height, cfg.grounds.body.options);
        this.addToWorld(this.body);
    }

}