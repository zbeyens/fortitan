import Matter from 'matter-js'


/**
 * Handle collisions 
 */
export default class CollisionHandler {

    constructor(physicsEngine) {
        this.physicsEngine = physicsEngine;
    }

    /**
     * Implementation required
     */
    handleCollisions() {
        throw new Error('Abstract method');

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