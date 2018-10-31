// import cfg from '../config';

/**
 * Defines the expected interface for all physics engines
 */
export default class PhysicsEngine {

    constructor(gameEngine) {
        this.gameEngine = gameEngine;

        if (!gameEngine) {
            console.warn('Physics engine initialized without gameEngine!');
        }
    }

    /**
     * A single Physics step.
     *
     * @param {Number} dt - time elapsed since last step
     */
    step(t, dt) {}

}