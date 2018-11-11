import Matter from 'matter-js';
import BodyFactory from '../../physics/BodyFactory';
import EntityPhysics from './EntityPhysics';
import cfg from '../../config';


export default class GroundPhysics extends EntityPhysics {

    constructor(entity, engine) {
        super(entity, engine);

        const propsBody = entity.props.body;
        this.body = BodyFactory.rectangle(entity, propsBody.width, propsBody.height, cfg.grounds.props.body.options);
        Matter.World.add(this.engine.world, this.body);
    }

}