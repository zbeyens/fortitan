import Entity from '../Entity';
// import GroundProps from './GroundProps';
import GroundState from './GroundState';
import EntityView from '../EntityView';
import ccfg from '../../config';

// import GroundView from './GroundView';

/**
 * Every Entity has a props, a state and a view component.
 */
export default class Ground extends Entity {
    constructor({ id, state, props, engine }) {
        super(id);
        // this.props = new GroundProps(props);
        this.props = props;
        this.state = new GroundState(this, state, engine);
        // this.view = new EntityView(this);

    	this.view = new Phaser.TileSprite(window.game, this.state.x, this.state.y, props.width, props.height, 'ground');
    	this.view.anchor.setTo(0.5);
    	window.game.platformGroup.add(this.view);
    }


  
}