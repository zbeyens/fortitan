import Resource from '../Resource';
import TreeProps from './TreeProps';
import TreeState from './TreeState';

/**
 * Every Entity has a props, a state and a view component.
 */
export default class Tree extends Resource {
    constructor({ id, state, props, engine }) {
        super(id);
        this.props = props;
		props.category = cfg.tree.category

        this.state = new TreeState(this, state, engine);
    }

}
