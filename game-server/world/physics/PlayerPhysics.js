import Matter from 'matter-js';
import EntityPhysics from './EntityPhysics';
import cfg from '../../config';


export default class PlayerPhysics extends EntityPhysics {

    constructor(entity, engine) {
        super(entity, engine);

        const cfgb = cfg.players.body;
        this.body = this.createRectangleBody(this.state.position, cfgb.width, cfgb.height, cfgb.options);
        this.addToWorld(this.body);
    }

    move() {
        Matter.Body.setVelocity(this.body, {
            x: this.state.direction.x * cfg.players.speed,
            y: this.body.velocity.y
        });
    }

    jump() {
        // Matter.Body.applyForce(this.state.body, this.state, {
        //     x: 0,
        //     y: cfg.players.jumpForce
        // });

        // set velocity instead of applyForce because applyForce is not always the same
        Matter.Body.setVelocity(this.body, {
            x: this.body.velocity.x,
            y: cfg.players.jumpForce
        });
    }

}