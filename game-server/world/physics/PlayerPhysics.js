import Matter from 'matter-js';
import EntityPhysics from './EntityPhysics';
import { BODY_ENTITIES } from '../../config/physics.config';

export default class PlayerPhysics extends EntityPhysics {
  constructor(entity, physicsEngine) {
    super(entity, physicsEngine);

    const cfgb = BODY_ENTITIES.players.body;
    this.body = this.createRectangleBody(
      this.state.position,
      cfgb.width,
      cfgb.height,
      cfgb.options
    );
    this.addToWorld(this.body);
  }

  move() {
    Matter.Body.setVelocity(this.body, {
      x: this.state.direction.x * BODY_ENTITIES.players.speed,
      y: this.body.velocity.y,
    });
  }

  jump() {
    // Matter.Body.applyForce(this.state.body, this.state, {
    //     x: 0,
    //     y: BODY_ENTITIES.players.jumpForce
    // });

    // set velocity instead of applyForce because applyForce is not always the same
    Matter.Body.setVelocity(this.body, {
      x: this.body.velocity.x,
      y: BODY_ENTITIES.players.jumpForce,
    });
  }
}
