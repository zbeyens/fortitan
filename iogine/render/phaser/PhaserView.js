/**
 * It handles the view of an Entity or any assets.
 */
export default class PhaserView {
  /**
   * All sprites are stored in a list to easily manipulate/destroy them
   * @param  {Entity} entity
   */
  constructor(id, initState, initProps) {
    this.id = id;

    this.state = initState;
    this.props = initProps;

    this.scene = window.scene;

    this.sprites = [];
  }

  addToSprites(sprite) {
    this.sprites.push(sprite);
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
   * Destroy all the sprites
   */
  destroy() {
    for (const sprite of this.sprites) {
      sprite.destroy();
    }
  }

  update(dt) {}

  /**
   * Default update: update the sprites position to the state position
   */
  updatePositions() {
    for (const sprite of this.sprites) {
      const { x, y } = this.state.position;
      sprite.setPosition(x, y);
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
