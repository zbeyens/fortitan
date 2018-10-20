/**
 * Every Entity has a View (sprite)
 * It's updated from the State
 */
export default class EntityV {
    constructor(entity) {
        this.props = {
            texture: 'p1_walk'
        };
        this.state = {
            position: {
                x: 0,
                y: 0,
            },
        };
        Object.assign(this, entity);
        this.props = {
            texture: 'p1'
        };
    }

    addSprite() {
        const pos = this.state.position;
        this.sprite = window.game.add.sprite(this.state.position.x, this.state.position.y, this.props.texture);
        this.sprite.anchor.setTo(0.5);
    }

    destroy() {
        this.sprite.destroy();
    }

    /**
     * update the sprite position
     */
    update(dt) {
        this.sprite.position = this.state.position;

        // this.game.debug.spriteBounds(this);
    }
}

// onAddToWorld(gameEngine)
// onRemoveFromWorld(gameEngine)
// attachAI()
// static get netScheme() {
//     return Object.assign({
//         showThrust: { type: Serializer.TYPES.INT32 }
//     }, super.netScheme);
// }
// syncTo(other) {
//     super.syncTo(other);
//     this.showThrust = other.showThrust;
// }