/**
 * The Renderer is the component containing all the sprites of the game.
 * It will be instantiated once on each client,.
 */
export default class Renderer {

    constructor(gameEngine, clientEngine) {
        this.gameEngine = gameEngine;
        this.clientEngine = clientEngine;

        gameEngine.on('objectAdded', this.addEntity.bind(this));
        gameEngine.on('objectDestroyed', this.removeEntity.bind(this));
    }

    /**
     * Handle the addition of a new object to the world.
     * @param {Object} obj - The object to be added.
     */
    addEntity(obj) {}

    /**
     * Handle the removal of an old object from the world.
     * @param {Object} obj - The object to be removed.
     */
    removeEntity(obj) {}
}