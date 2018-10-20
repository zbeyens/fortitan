import Matter from 'matter-js'
import PhysicsEngine from './PhysicsEngine'
import cfg from '../../client/src/js/config'


/**
 * Matter.js physics engine runned on the server
 */
 export default class MatterPhysicsEngine extends PhysicsEngine {

    constructor(gameEngine) {
        super(gameEngine);

        this.initEngine();

        if (cfg.standaloneMode) {
            this.initRenderer();
        }
    }

    /**
     * Init the physics engine that checks collisions at every step.
     */
     initEngine() {
        Object.assign(this, Matter.Engine.create());
    }

    /**
     * Create a renderer of the physics to debug
     */
     initRenderer() {
        const self = this;
        
        this.renderer = Matter.Render.create({
            element: document.body,
            engine: self,
            options: {
                width: 800,
                height: 600,
                hasBounds: true,
                showAxes: true,
                showCollisions: true,
                showConvexHulls: true
            }
        });
        Matter.Render.run(this.renderer);
    }

    step(t, dt) {
        Matter.Engine.update(this, dt);

        if (cfg.standaloneMode) {
            const selfPlayer = this.gameEngine.world.entities.players[0];
            if (selfPlayer) {
                const w = this.renderer.options.width;
                const h = this.renderer.options.height;
                const pos = selfPlayer.state.position;
                this.renderer.bounds.min.x = -w / 2 + pos.x;
                this.renderer.bounds.max.x = w / 2 + pos.x;
                this.renderer.bounds.min.y = -h / 2 + pos.y;
                this.renderer.bounds.max.y = h / 2 + pos.y;
            }
        }
    }

    

}