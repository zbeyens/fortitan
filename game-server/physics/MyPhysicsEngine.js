import MatterPhysicsEngine from './MatterPhysicsEngine';
import MyCollisionResponse from './MyCollisionResponse';
// import cfg from '../config';


export default class MyPhysicsEngine extends MatterPhysicsEngine {

    constructor(gameEngine) {
        super(gameEngine);

        this.collisionResponse = new MyCollisionResponse(this);
    }

    step(t, dt) {
        // if dt is too high, don't process the step to not break the game
        const dtMax = 100;
        if (dt > dtMax) return;

        super.step(t, dt);
    }

}