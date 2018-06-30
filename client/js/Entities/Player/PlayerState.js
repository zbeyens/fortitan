import Matter from 'matter-js';
import EntityState from '../EntityState';
import ccfg from '../../config';
import PlayerActionIdleState from './States/PlayerActionIdleState'
import PlayerActionHittingState from './States/PlayerActionHittingState'


export default class PlayerState extends EntityState {

    constructor(entity, state, engine) {
        super(entity, state, engine);

        this.createCircleBody(this.entity.props.radius, false);
    }

    init() {
        this.actionState = new PlayerActionIdleState(this);
    }

    handleInput(input) {
        this.actionState.handleInput(input);

        this.dirX = 0;
        this.dirY = 0;
        if (input.left) {
            this.dirX = -1;
        }
        if (input.right) {
            this.dirX = 1;
        }
        if (input.up) {
            this.dirY = -1;
        }
        if (input.down) {
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
        const moveFactor = ccfg.playerSpeed;

        // Matter.Sleeping.set(this.body, false);
        Matter.Body.setVelocity(this.body, { x: dirX * moveFactor, y: dirY * moveFactor });
    }

    getActionIdleState() {
        return new PlayerActionIdleState(this);
    }

    getActionHittingState() {
        return new PlayerActionHittingState(this);
    }

}