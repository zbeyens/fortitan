import EntityView from '../EntityView';

export default class PlayerView extends EntityView {

    constructor(entity) {
        super(entity);

        //  Create an animation called 'walk', the fact we don't specify any frames means it will use all frames in the atlas
        this.animations.add('walk');

    }

    update(delta) {
        super.update(delta);
        // this.game.debug.spriteBounds(this);

        if (this.entity.state.dirX) {
            //  Play the animation at 30fps on a loop
            this.animations.play('walk', 15, true);
        } else {
        	this.animations.stop('walk', true);
        }

        // TODO: jump 

        // TODO: follow the mouseX ?
        if (this.entity.state.dirLeft) {
            this.scale.x = -1;
        } else {
            this.scale.x = 1;
        }

        // this.entity.state.actionState.render(this);
    }

}