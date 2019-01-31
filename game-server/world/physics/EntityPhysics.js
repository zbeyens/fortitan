import Matter from "matter-js";

/**
 * Create the Bodies.
 * Handle the effect of collisions.
 */
export default class EntityPhysics {
  constructor(entity, physicsEngine) {
    this.entity = entity;
    this.state = entity.state;
    this.engine = physicsEngine;
  }

  addToWorld(body) {
    Matter.World.add(this.engine.world, body);
  }

  createCircleBody(pos, radius, options) {
    const body = Matter.Bodies.circle(pos.x, pos.y, radius, options);
    body.entity = this.entity;
    return body;
  }

  createRectangleBody(pos, width, height, options) {
    const body = Matter.Bodies.rectangle(pos.x, pos.y, width, height, options);
    body.entity = this.entity;
    return body;
  }
}
