import Matter from 'matter-js';
import EntityState from '../EntityState';
import ccfg from '../../config';
import PlayerActionIdleState from './States/PlayerActionIdleState'
import PlayerActionHittingState from './States/PlayerActionHittingState'


export default class PlayerState extends EntityState {

    constructor(entity, state, engine) {
        super(entity, state, engine);

        this.body = this.circle(ccfg.player.bodyRadius, ccfg.player.bodyOptions);
        Matter.World.add(this.engine.world, this.body);

        // TODO: create Map
        const body = Matter.Bodies.rectangle(0, 800, 3000, 200, {
            isStatic: true,
            inertia: Infinity, //prevents player rotation
            // friction: 0.002, 
            friction: 1,
            frictionAir: 1,
            // collisionFilter: {
            //     // group
            //     category: category,
            //     mask: mask
            // },
        });
        Matter.World.add(this.engine.world, body);
    }

    init() {
        this.actionState = new PlayerActionIdleState(this);
    }

    handleInput(input) {
        this.actionState.handleInput(input);

        this.dirX = 0;
        this.dirY = 0;
        if (input.left) {
            this.dirLeft = true;
            this.dirX = -1;
        }
        if (input.right) {
            this.dirLeft = false;
            this.dirX = 1;
        }
        if (input.up) {
            this.dirY = 1;
        }

    }

    /**
     * Update the position from the inputs
     */
    update(delta) {
        this.move(this.dirX, this.dirY);

        this.x = this.body.position.x;
        this.y = this.body.position.y;


        this.targetAngle = Math.atan2(window.game.camera.y + window.game.input.mousePointer.y - this.y, window.game.camera.x + window.game.input.mousePointer.x - this.x);

        // console.log(window.game.camera.x);
        this.angle = this.targetAngle * 180 / Math.PI;
        // Matter.Body.setAngle(this.body, this.targetAngle);

        this.actionState.update(delta);
    }

    /**
     * Move the player
     * @param  {int} dirX   moving direction (-1, 1, 0)
     * @param  {int} dirY   moving direction (-1, 1, 0)
     */
    move(dirX, dirY) {
        const body = this.body;

        

        if (this.dirY && this.onGround) {
           // this.onGround = false;

            Matter.Body.applyForce(this.body, this, {
                x: 0,
                y: -0.4
            });
        }

        Matter.Body.setVelocity(body, {
            x: dirX * ccfg.player.speed,
            y: body.velocity.y
        });
    }

    getActionIdleState() {
        return new PlayerActionIdleState(this);
    }

    getActionHittingState() {
        return new PlayerActionHittingState(this);
    }

    enterLand() {
        this.onGround = true;
        console.log("onground END" + this.onGround);
    }
    exitLand() {
        this.onGround = false;
        console.log("offground END" + this.onGround);
    }
}