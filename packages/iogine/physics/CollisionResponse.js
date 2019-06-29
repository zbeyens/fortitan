import Matter from 'matter-js';


/**
 * The collision engine is split into two parts: collision detection and collision response.
 * Matter handles collision detection.
 * This class handles collision response. 
 */
export default class CollisionResponse {

    constructor(physicsEngine) {
        this.physicsEngine = physicsEngine;
    }

    /**
     * Implementation required
     */
    handleCollisions() {
        // throw new Error('Abstract method');

        Matter.Events.on(this.physicsEngine, "collisionStart", (event) => {
            event.pairs.forEach((pair) => {
                // const entityA = pair.bodyA.parent.entity;
                // const entityB = pair.bodyB.parent.entity;

                // if (!entityA || !entityB) return;

                // check collisions
            });
        });

        Matter.Events.on(this.physicsEngine, 'collisionActive', (event) => {
            event.pairs.forEach((pair) => {

            });
        });

        Matter.Events.on(this.physicsEngine, 'collisionEnd', (event) => {
            event.pairs.forEach((pair) => {

            });
        });
    }


}