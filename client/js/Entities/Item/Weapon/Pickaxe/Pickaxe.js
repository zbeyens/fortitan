import Entity from '../../../Entity';
import PickaxeState from './PickaxeState';
import PickaxeView from './PickaxeView';
import ccfg from '../../../../config';

/**
 * Every Entity has a props, a state and a view component.
 */
export default class Pickaxe extends Entity {
    constructor({ id, state, props, engine }) {
        super(id);
        // this.props = new GroundProps(props);
        this.props = props;
        console.log(state);
        this.state = new PickaxeState(this, state, engine);
        this.view = new PickaxeView(this);

      //  this.view = new Phaser.TileSprite(window.game, this.state.x, this.state.y, props.width, props.height, 'pickaxe');
        //this.view.anchor.setTo(0.5);
    
       // window.game.platformGroup.add(this.view);
    }

}