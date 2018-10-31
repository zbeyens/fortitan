/**
 * Every Entity has a View (sprite)
 * It's updated from the State
 */
 export default class EntityV {
    constructor(entity) {
        this.state = {
            position: {
                x: 0,
                y: 0,
            },
        };
        Object.assign(this, entity);

        this.sprites = [];
    }

    addSprite(key) {
        const pos = this.state.position;
        const sprite = window.game.add.sprite(pos.x, pos.y, key);
        sprite.anchor.setTo(0.5);
        this.sprites.push(sprite);

        return sprite;
    }


    getAnimationFrames(nFrames, offset = 0) {
        const frames = [];
        for (let i = 0; i < nFrames; i++) {
            frames.push(offset + i);
        }

        return frames;
    }

    destroy() {
        for (const sprite of this.sprites) {
            sprite.destroy();
        }
    }

    update(dt) {}

    /**
     * update the sprites position
     */
    updateSprites() {
        for (const sprite of this.sprites) {
            sprite.position = this.state.position;
        }

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