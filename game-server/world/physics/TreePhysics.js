import EntityPhysics from './EntityPhysics';
import cfg from '../../config';


export default class TreePhysics extends EntityPhysics {

    constructor(entity, physicsEngine) {
        super(entity, physicsEngine);

        const cfgb = cfg.trees.body;
        this.body = this.createCircleBody(this.state.position, cfgb.radius, cfgb.options);
        this.addToWorld(this.body);
    }

}