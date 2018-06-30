import Entity from '../Entity';
import PlayerProps from './PlayerProps';
import PlayerState from './PlayerState';
import PlayerView from './PlayerView';

/**
 * Every Entity has a props, a state and a view component.
 */
export default class Player extends Entity {
    constructor({ id, state, props, engine }) {
        super(id);
        this.props = new PlayerProps(props);
        this.state = new PlayerState(this, state, engine);
        this.view = new PlayerView(this);
        this.state.init();
    }


  
}