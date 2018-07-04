import Entity from '../Entity';
import GroundProps from './GroundProps';
import GroundState from './GroundState';
import GroundView from './GroundView';

/**
 * Every Entity has a props, a state and a view component.
 */
export default class Ground extends Entity {
    constructor({ id, state, props, engine }) {
        super(id);
        // this.props = new GroundProps(props);
        this.props = props;
        this.state = new GroundState(this, state, engine);
        this.view = new EntityView(this);
    }


  
}