import Entity from '../Entity';
import PlayerProps from './PlayerProps';
import PlayerState from './PlayerState';
import PlayerView from './PlayerView';
import Wall from '../Building/Wall/Wall';

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

        const self = this;
        this.buildingPreview = new Wall({
        	id: 0,
        	props: {},
        	state: {
        		x: self.state.x,
        		y: self.state.y,
        		owner: self,
        	},
        	engine: engine
        });
    }


    update(delta) {
    	super.update(delta);
    	this.buildingPreview.update(delta);
    }
    
  
}