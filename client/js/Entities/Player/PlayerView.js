import EntityView from '../EntityView';
import ccfg from '../../config';

export default class PlayerView extends EntityView {

    constructor(entity) {
        super(entity);

        const framesWalk = [];
        for (var i = 0; i < 11; i++) {
            framesWalk.push(2+i);
        }
        //  Create an animation called 'walk', the fact we don't specify any frames means it will use all frames in the atlas
        this.animations.add('walk', framesWalk);
        this.game.playerGroup.add(this);

        this.wall = new Phaser.Rectangle(0, 550, 800, 50);
    }

    update(delta) {
        super.update(delta);
        // this.game.debug.spriteBounds(this);

        const isMoving = this.entity.state.dirX;
        const onGround = this.entity.state.onGround;

        if (onGround && isMoving && !this.animations.getAnimation('walk').isPlaying) {
            //  Play the animation at 30fps on a loop
            this.animations.play('walk', 15, true);
        }
        if (!isMoving && this.animations.getAnimation('walk').isPlaying) {
        	this.animations.stop('walk', true);
            this.frame = 1;
        } 
        if (!isMoving && onGround) {
            this.frame = 1;
        } 
        if (!onGround) {
            this.frame = 0;
        }

        // TODO: jump 

        // TODO: follow the mouseX ?
        if (this.entity.state.dirLeft) {
            this.scale.x = -1;
        } else {
            this.scale.x = 1;
        }

        // this.entity.state.actionState.render(this);

        const width = 10;
        const height = ccfg.tileSize;
        this.wall.setTo(this.entity.state.x + ccfg.tileSize / 2 - width / 2, this.entity.state.y - height / 2, width, height);
        this.game.debug.geom(this.wall,'#A67C52');
    }

}