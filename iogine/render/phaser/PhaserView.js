/**
 * It handles the view of an Entity or any assets.
 */
 export default class PhaserView {

    /**
     * All sprites are stored in a list to easily manipulate/destroy them
     * @param  {Entity} entity
     */
    constructor(entity) {
        Object.assign(this, entity);

        this.sprites = [];
    }

    /**
     * Add a sprite to the game and set its anchor point to its center
     * @param {Object} position
     * @param {String} key      key of the texture to use
     */
    addSprite(position, key) {
        const sprite = window.game.add.sprite(position.x, position.y, key);
        sprite.anchor.setTo(0.5);
        this.sprites.push(sprite);

        return sprite;
    }

    add(sprite) {
        this.sprites.push(sprite);
    }

    centerAnchor(sprite) {
        sprite.anchor.setTo(0.5);
    }

    /**
     * Get an array of 'nFrames' consecutive number from the offset
     * It is required to create an animation  
     * @param  {Number} nFrames - number of frames
     * @param  {Number} offset - frame index to start
     * @return {List}         
     */
    getAnimationFrames(nFrames, offset = 0) {
        const frames = [];
        for (let i = 0; i < nFrames; i++) {
            frames.push(offset + i);
        }

        return frames;
    }

    /**
     * Destroy all the sprites from this entity
     */
    destroy() {
        for (const sprite of this.sprites) {
            sprite.destroy();
        }
    }

    update(dt) {}

    /**
     * Update the sprites position
     * Not useful
     */
    updateSprites() {
        for (const sprite of this.sprites) {
            sprite.position = this.state.position;
        }
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