import Resource from '../Resource';
import TreeProps from './TreeProps';
import TreeState from './TreeState';
import TreeView from './TreeView';

/**
 * Every Entity has a props, a state and a view component.
 */
export default class Tree extends Resource {
    constructor({ id, state, props, engine }) {
        super(id);
        this.props = new TreeProps(props);
        this.state = new TreeState(this, state, engine);
        this.view = new TreeView(this);
    }

}
