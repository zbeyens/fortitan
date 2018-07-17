import Entity from '../../Entity';
// import WallProps from './WallProps';
import WallState from './WallState';
import WallView from './WallView';
import ccfg from '../../../config';


/**
 * Every Entity has a props, a state and a view component.
 */
export default class Wall extends Entity {
    constructor({ id, state, props, engine }) {
        super(id);
        this.props = props;
        this.props.category = ccfg.treeCategory;
        this.state = new WallState(this, state, engine);
        this.view = new WallView(this);
    }


  
}