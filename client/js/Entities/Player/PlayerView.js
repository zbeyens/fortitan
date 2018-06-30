import EntityView from '../EntityView';

export default class PlayerView extends EntityView {

    update(delta) {
    	super.update(delta);
    	// this.game.debug.spriteBounds(this);
    	// 
    	this.angle = this.entity.state.angle;

        // this.entity.state.actionState.render(this);
    }
    
}