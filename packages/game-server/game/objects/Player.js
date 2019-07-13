import GameObject from './GameObject.matter';

export default class Player extends GameObject {
  constructor(scene, x, y, clientId, socketId) {
    super(scene, 'dude');

    this.socketId = socketId;
    this.clientId = clientId;

    this.maxVelocity = {
      x: 6,
      y: 12,
    };
    this.width = 32;
    this.height = 48;
    this.shouldUpdate = true;
    this.sensors = null;
    this.mainBody = null;
    this.translateX = 0;
    this.translateY = 0;
    this.jumpLocked = false;
    this.move = {
      leftAllowed: true,
      rightAllowed: true,
    };
    this.touching = {
      left: false,
      right: false,
      bottom: false,
    };
    this.updates = {};

    const h = this.height;
    const w = this.width - 4;

    console.info('clientId', clientId);

    this.mainBody = this.Matter.Bodies.rectangle(x, y, w, h, {
      label: 'dude',
      chamfer: { radius: 10 },
    });
    this.sensors = {
      bottom: this.Matter.Bodies.rectangle(x, y + h / 2 + 2 / 2, w * 0.35, 4, {
        isSensor: true,
      }),
      left: this.Matter.Bodies.rectangle(x - w / 2 - 4 / 2, y + 0, 4, h * 0.9, {
        isSensor: true,
      }),
      right: this.Matter.Bodies.rectangle(
        x + w / 2 + 4 / 2,
        y + 0,
        4,
        h * 0.9,
        {
          isSensor: true,
        }
      ),
    };
    this.addBodies(
      [
        this.mainBody,
        this.sensors.bottom,
        this.sensors.left,
        this.sensors.right,
      ],
      { frictionStatic: 0.5, inertia: Infinity }
    );

    this.setSensorLabel();

    // this.Matter.Body.setInertia(this.body, Infinity); // setFixedRotation
  }

  setTranslate(x, y = 0) {
    this.translateX = x;
    this.translateY = y;
  }

  translate() {
    if (this.translateX !== 0 || this.translateY !== 0) {
      this.Matter.Body.setPosition(this.body, {
        x: this.body.position.x + this.translateX,
        y: this.body.position.y + this.translateY,
      });
      this.translateX = 0;
      this.translateY = 0;
    }
  }

  setSensorLabel() {
    this.sensors.bottom.label = `dudeBottomSensor_${this.clientId}`;
    this.sensors.left.label = `dudeLeftSensor_${this.clientId}`;
    this.sensors.right.label = `dudeRightSensor_${this.clientId}`;
  }

  lockJump() {
    this.jumpLocked = true;
    this.scene.time.addEvent({
      delay: 250,
      callback: () => (this.jumpLocked = false),
    });
  }

  setUpdates(updates) {
    this.shouldUpdate = true;
    this.updates = updates;
  }

  update(force = false) {
    this.animation = 'idle';

    if (!force && !this.shouldUpdate) return;

    const { updates } = this;

    let x = 0;
    if (updates.left && this.move.leftAllowed) {
      x = -0.01;
    } else if (updates.right && this.move.rightAllowed) {
      x = 0.01;
    }
    if (x !== 0)
      this.Matter.Body.applyForce(this.body, { x: 0, y: 0 }, { x, y: 0 });

    let y = 0;
    if (!this.jumpLocked && updates.up && this.touching.bottom) {
      y = -this.maxVelocity.y;
      this.lockJump();

      this.Matter.Body.setVelocity(this.body, { x: this.body.velocity.x, y });
    }

    // check max velocity
    const maxVelocityX =
      this.body.velocity.x > this.maxVelocity.x
        ? 1
        : this.body.velocity.x < -this.maxVelocity.x
        ? -1
        : null;
    if (maxVelocityX)
      this.Matter.Body.setVelocity(this.body, {
        x: this.maxVelocity.x * maxVelocityX,
        y: this.body.velocity.y,
      });

    // set velocity X to zero
    if (!updates.left && !updates.right) {
      this.Matter.Body.setVelocity(this.body, {
        x: this.body.velocity.x * 0.5,
        y: this.body.velocity.y,
      });
    }

    this.animation =
      this.body.velocity.x >= 0.5
        ? 'right'
        : this.body.velocity.x <= -0.5
        ? 'left'
        : 'idle';

    this.translate();

    this.touching = {
      left: false,
      right: false,
      bottom: false,
    };
    this.move = {
      leftAllowed: true,
      rightAllowed: true,
    };
    this.updates = {};
    this.shouldUpdate = false;
  }
}

// revive(x, y, clientId, socketId) {
//   super.revive(x, y);
//   this.clientId = clientId;
//   this.socketId = socketId;
//   this.setSensorLabel();
// }
