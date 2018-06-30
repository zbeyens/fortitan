import Matter from 'matter-js';
import State from './State';
import ccfg from '../../../config/cConfig.global';


export default class PlayerActionHittingState extends State {
    constructor(state) {
        super(state);
        this.state.hitting = true;
        this.timeElapsed = 0;

        this.hits = [];

        this.renderOnce();
    }


    update(delta) {
        this.timeElapsed += delta;

        this.checkHitCollisions();

        if (this.timeElapsed > ccfg.playerHittingCd) {
            this.state.actionState = this.state.getActionIdleState(this.state);
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
    checkHitCollisions() {
        const state = this.state;
        const startPoint = { x: state.x, y: state.y };
        const endPoint = { x: startPoint.x + Math.cos(state.targetAngle) * ccfg.playerHittingRayRange, y: startPoint.y + Math.sin(state.targetAngle) * ccfg.playerHittingRayRange };
        const bodies = Matter.Composite.allBodies(this.state.engine.world);

        const collisions = Matter.Query.ray(bodies, startPoint, endPoint, ccfg.playerHittingRayWidth);
        //console.log(bodies);
        for (let i = 0; i < collisions.length; i++) {
            const collision = collisions[i];
            if (collision.parentA.entity === this.state.entity) continue;

            let alreadyHit = false;
            for (let j = this.hits.length - 1; j >= 0; j--) {
                if (collision.parentA.entity === this.hits[j]) {
                    alreadyHit = true;
                }
            }
            if (alreadyHit) continue;

            this.hits.push(collision.parentA.entity);

            console.log("hit!");
            this.handleHit(collision.parentA.entity);
        }
    }

    // TODO
    handleHit(entity) {

    }

    renderOnce() {
        const view = this.state.entity.view;
        view.alpha = 0.5;
    }

}