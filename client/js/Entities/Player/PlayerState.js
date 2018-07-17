import Matter from 'matter-js';
import EntityState from '../EntityState';
import ccfg from '../../config';
import PlayerActionIdleState from './States/PlayerActionIdleState'
import PlayerActionHittingState from './States/PlayerActionHittingState'


export default class PlayerState extends EntityState {

    constructor(entity, state, engine) {
        super(entity, state, engine);

        this.body = this.rectangle(ccfg.player.bodyWidth, ccfg.player.bodyHeight, ccfg.player.bodyOptions);
        Matter.World.add(this.engine.world, this.body);

        this.onGround = false;
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
        // const jumpTimeElapsed = new Date() - this.jumpTime || 1000;
        if (Math.abs(this.body.velocity.y) < 0.01) {
            this.onGround = true;
        } else {
            this.onGround = false;
        }

        this.x = this.body.position.x;
        this.y = this.body.position.y;
        this.move(this.dirX, this.dirY);




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
           this.onGround = false;

           console.log("apply force");
            Matter.Body.applyForce(this.body, this, {
                x: 0,
                y: ccfg.player.jumpForce
            });

            this.jumpTime = new Date();
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
        // this.onGround = true;
        console.log("onground END" + this.onGround);
    }
    exitLand() {
        // this.onGround = false;
        console.log("offground END" + this.onGround);
    }
}