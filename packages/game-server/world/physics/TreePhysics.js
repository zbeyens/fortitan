import EntityPhysics from './EntityPhysics';
import { BODY_ENTITIES } from '../../config/physics.config';

export default class TreePhysics extends EntityPhysics {
  constructor(entity, physicsEngine) {
    super(entity, physicsEngine);

    const cfgb = BODY_ENTITIES.trees.body;
    this.body = this.createCircleBody(
      this.state.position,
      cfgb.radius,
      cfgb.options
    );
    this.addToWorld(this.body);
    this.body.noGravity = true;
  }
}
