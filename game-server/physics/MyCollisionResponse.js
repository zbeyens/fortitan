import Matter from 'matter-js';
import CollisionResponse from 'iogine/physics/CollisionResponse';
// import cfg from '../../config';

/**
 * Handle collisions 
 */
export default class MyCollisionResponse extends CollisionResponse {

    constructor(physicsEngine) {
        super(physicsEngine);

        this.handleCollisions();
    }

    handleCollisions() {
        Matter.Events.on(this.physicsEngine, "collisionStart", (event) => {
            event.pairs.forEach((pair) => {
                console.log("collision");
                const entityA = pair.bodyA.parent.entity;
                const entityB = pair.bodyB.parent.entity;

                if (!entityA || !entityB) return;

                this.checkPlayerGroundCollision(entityA, entityB);

                // this.checkPickaxeTreeCollisions(entityA, entityB);
            });
        });

        Matter.Events.on(this.physicsEngine, 'collisionActive', (event) => {
            event.pairs.forEach((pair) => {
                const entityA = pair.bodyA.parent.entity;
                const entityB = pair.bodyB.parent.entity;

                if (!entityA || !entityB) return;

            });
        });

        Matter.Events.on(this.physicsEngine, 'collisionEnd', (event) => {
            event.pairs.forEach((pair) => {
                const entityA = pair.bodyA.parent.entity;
                const entityB = pair.bodyB.parent.entity;

                if (!entityA || !entityB) return;

                this.checkPlayerGroundCollisionEnd(entityA, entityB);
            });
        });
    }

    checkPlayerGroundCollision(entityA, entityB) {
        const player = this.getEntity(entityA, entityB, 'Player');
        if (!player) return;

        console.log("on ground");
        // player.enterLand();
    }

    checkPlayerGroundCollisionEnd(entityA, entityB) {
        const player = this.getEntity(entityA, entityB, 'Player');
        if (!player) return;

        console.log("off ground");
        // player.exitLand();
    }

    /**
     * Get the entity from the class name
     * Note that if the file is minified, the constructor name would be modified.
     * As it is server-side, it should be ok
     * @param  {Entity} entityA
     * @param  {Entity} entityB
     * @param  {String} className
     * @return {Entity}
     */
    getEntity(entityA, entityB, className) {
        if (entityA.constructor.name === className) {
            return entityA;
        }
        if (entityB.constructor.name === className) {
            return entityB;
        }

        return null;
    }

    /**
     * Use raycasting to check collisions
     * Raycasting create a rectangle between startPoint and endPoint
     * and check collisions with all the bodies.
     * If there is a collision with self, ignore.
     * If already hit one entity, ignore.
     * Else, add the hit entity in this.hit and handle the collision. 
     */
    checkPickaxeTreeCollisions(entityA, entityB) {
        const tree = this.getEntity(entityA, entityB, 'Tree');
        if (!tree) return;

        const pickaxe = this.getEntity(entityA, entityB, 'Pickaxe');
        if (!pickaxe) return;

        console.log("Collision between pickaxe and tree");
        //player.state.cutTree();
    }

}