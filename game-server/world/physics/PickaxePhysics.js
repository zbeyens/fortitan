import Matter from "matter-js";
import EntityPhysics from "./EntityPhysics";
import cfg from "../../config";

export default class PickaxePhysics extends EntityPhysics {
  constructor(entity, physicsEngine) {
    super(entity, physicsEngine);

    const cfgb = cfg.pickaxes.body;
    this.body = this.createCircleBody(
      this.state.position,
      cfgb.radius,
      cfgb.options
    );
    this.addToWorld(this.body);
  }

  updatePosition() {
    Matter.Body.setPosition(this.body, {
      x: this.state.position.x,
      y: this.state.position.y
    });
  }
}
