import Matter from 'matter-js';
import State from './State';
import cfg from '../../config';


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

        if (this.timeElapsed > cfg.players.hittingCd) {
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
        const endPoint = { x: startPoint.x + Math.cos(state.targetAngle) * cfg.players.hittingRayRange, y: startPoint.y + Math.sin(state.targetAngle) * cfg.players.hittingRayRange };
        const bodies = Matter.Composite.allBodies(this.state.engine.world);

        const collisions = Matter.Query.ray(bodies, startPoint, endPoint, cfg.players.hittingRayWidth);
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