import EntityPhysics from './EntityPhysics';
import { BODY_ENTITIES } from '../../config/physics.config';

export default class GroundPhysics extends EntityPhysics {
  constructor(entity, physicsEngine) {
    super(entity, physicsEngine);

    const propsBody = entity.props.body;
    this.body = this.createRectangleBody(
      this.state.position,
      propsBody.width,
      propsBody.height,
      BODY_ENTITIES.grounds.body.options
    );
    this.addToWorld(this.body);
  }
}
