import Phaser from 'phaser';

export default class GameObject {
  constructor(scene, type) {
    this.scene = scene;
    this.type = type;

    this.Matter = Phaser.Physics.Matter.Matter;
    this.body = null;
    this.clientId = null;
    // this.dead = false;
    // this.prevDead = false;
    this.angle = 0; // in DEG
    this.prevAngle = -1; // in DEG
    this.animation = 'idle';
    this.prevAnimation = 'idle';
    this.tint = 0x000000;
  }

  addBody(body) {
    this.body = body;
    this.postAddBody();
  }

  addBodies(bodies, options) {
    this.body = this.Matter.Body.create({
      parts: bodies,
      ...options,
    });
    this.postAddBody();
  }

  postAddBody() {
    this.body.prevVelocity = { x: 0, y: 0 };
    this.scene.matter.world.add(this.body);
  }

  preUpdate() {
    this.angle = Phaser.Math.RadToDeg(this.body.angle);
  }

  update() {}

  postUpdate() {
    this.body.prevVelocity = { ...this.body.velocity };
    this.prevAngle = this.angle;
    this.prevAnimation = this.animation;
  }
}

// postUpdate() {
//   if (this.dead && !this.prevDead) this.prevDead = true;
//   else if (!this.dead && this.prevDead) this.prevDead = false;

//   this.body.prevVelocity = { ...this.body.velocity };
//   this.prevAngle = this.angle;
//   this.prevAnimation = this.animation;
// }
// revive(x, y, clientId, socketId) {
// revive(x, y) {
//   this.kill(false);
//   this.Matter.Body.setPosition(this.body, { x, y });
// }

// kill(dead = true) {
//   this.dead = dead;
//   if (dead) this.Matter.Body.setPosition(this.body, { x: -1000, y: -1000 });
//   this.Matter.Sleeping.set(this.body, dead);
// }
