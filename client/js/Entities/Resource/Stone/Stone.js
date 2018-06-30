import Resource from '../Resource';
import StoneProps from './StoneProps';
import StoneState from './StoneState';
import StoneView from './StoneView';

/**
 * Every Entity has a props, a state and a view component.
 */
export default class Stone extends Resource {
    constructor({ id, state, props }) {
        super(id);
        this.props = new StoneProps(props);
        this.state = new StoneState(this, state);
        this.view = new StoneView(this);
    }

}
