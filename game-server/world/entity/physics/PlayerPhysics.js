import Matter from 'matter-js';
import BodyFactory from '../../../physics/BodyFactory';
import EntityPhysics from './EntityPhysics'
import cfg from '../../../config';


export default class PlayerPhysics extends EntityPhysics {

    constructor(entity, engine) {
        super(entity, engine);

        this.body = BodyFactory.rectangle(entity, cfg.players.bodyWidth, cfg.players.bodyHeight, cfg.players.bodyOptions);
        Matter.World.add(this.engine.world, this.body);
    }

    move() {
    	Matter.Body.setVelocity(this.entity.physics.body, {
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
            y: -13
        });
    }

}