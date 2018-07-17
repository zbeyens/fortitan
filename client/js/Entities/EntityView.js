/**
 * Every Entity has a View (sprite)
 * It's updated from the State
 */
export default class EntityView extends Phaser.Sprite {
    constructor(entity) {
        super(window.game, entity.state.x, entity.state.y, entity.props.skin);
        this.entity = entity;
        this.anchor.setTo(0.5);

        //this.game.add.existing(this);

    }

    /**
     * update the sprite position
     */
    update(delta) {
        this.x = this.entity.state.x;
        this.y = this.entity.state.y;
        
        // this.game.debug.spriteBounds(this);
    }
}