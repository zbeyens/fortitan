import Entity from './Entity';
import cfg from '../../config';


/**
 * Every Entity has a props, a state and a view component.
 */
export default class Wall extends Entity {
    constructor({ id, state, props, engine }) {
        super(id);
        this.props = props;
        this.props.category = cfg.treeCategory;
        // this.state = new WallState(this, state, engine);
    }


  
}