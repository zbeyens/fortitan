import Entity from '../../../Entity';
import PickaxeState from './PickaxeState';
import cfg from '../../../../../config';

/**
 * Every Entity has a props, a state and a view component.
 */
export default class Pickaxe extends Entity {
    constructor({ id, state, props, engine }) {
        super(id);
        this.props = props;
        this.props.category = cfg.item.pickaxeCategory;
        this.state = new PickaxeState(this, state, engine);
    }

}