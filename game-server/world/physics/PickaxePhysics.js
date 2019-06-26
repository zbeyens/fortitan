import Matter from 'matter-js';
import EntityPhysics from './EntityPhysics';
import { BODY_ENTITIES } from '../../config/physics.config';

export default class PickaxePhysics extends EntityPhysics {
  constructor(entity, physicsEngine) {
    super(entity, physicsEngine);

    const cfgb = BODY_ENTITIES.pickaxes.body;
    this.body = this.createCircleBody(
      this.state.position,
      cfgb.radius,
      cfgb.options
    );
    this.addToWorld(this.body);
    this.body.noGravity = true;
  }

  updatePosition() {
    Matter.Body.setPosition(this.body, {
      x: this.state.position.x,
      y: this.state.position.y,
    });
  }
}
