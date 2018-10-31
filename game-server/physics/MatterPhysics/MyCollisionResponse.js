import Matter from 'matter-js';
import CollisionResponse from './CollisionResponse';
import cfg from '../../config';

/**
 * Handle collisions 
 */
export default class MyCollisionResponse extends CollisionResponse {

    constructor(physicsEngine) {
        super(physicsEngine);

        this.initCollisionReponse();
    }

    initCollisionReponse() {
        Matter.Events.on(this.physicsEngine, "collisionStart", (event) => {
            event.pairs.forEach((pair) => {
                console.log("collision");
                const entityA = pair.bodyA.parent.entity;
                const entityB = pair.bodyB.parent.entity;

                if (!entityA || !entityB) return;

                console.log(entityA);

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
        const player = this.getEntity(entityA, entityB, cfg.players.props.category);
        if (!player) return;

        console.log("on ground");
        // player.enterLand();
    }

    checkPlayerGroundCollisionEnd(entityA, entityB) {
        const player = this.getEntity(entityA, entityB, cfg.players.props.category);
        if (!player) return;

        console.log("off ground");
        // player.exitLand();
    }

    /**
     * Get entity from the category 
     * @param  {Entity} entityA
     * @param  {Entity} entityB
     * @param  {hex} category
     * @return {Entity}
     */
    getEntity(entityA, entityB, category) {
        if (!entityA.props) {
            console.log('Alert: no props detected');
            console.log(entityA);
            return;
        }
        if (!entityB.props) {
            console.log('Alert: no props detected');
            console.log(entityB);
            return;
        }

        const categoryA = entityA.props.category;
        const categoryB = entityB.props.category;

        if (categoryA === category) {
            return entityA;
        }
        if (categoryB === category) {
            return entityB;
        }
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
        const tree = this.getEntity(entityA, entityB, cfg.trees.props.category);
        if (!tree) return;

        const pickaxe = this.getEntity(entityA, entityB, cfg.pickaxes.props.category);
        if (!pickaxe) return;

        console.log("Collision between pickaxe and tree");
        //player.state.cutTree();
    }

}