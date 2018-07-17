import Entity from '../Entity';
import PlayerProps from './PlayerProps';
import PlayerState from './PlayerState';
import PlayerView from './PlayerView';
import Pickaxe from '../Item/Weapon/Pickaxe/Pickaxe';
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
        this.items = [];
        const self = this;
        this.items.push(new Pickaxe({
            id: 0,
            state: {
                x: this.state.x,
                y: this.state.y,
                owner: self
            },
            props: {
                skin: "pickaxe"
            },
            engine: engine
        }));
    }

	 update(delta) {
	 	super.update(delta);
    	for (let i = this.items.length - 1; i >= 0; i--) {
            const entity = this.items[i];
            entity.update(delta);
        }
    }
  
}