import Phaser from 'phaser';
import { DEBUG_CS } from '@fortitan/shared/config/debug.csconfig';
import { WORLD_CS, TYPES } from '@fortitan/shared/config/world.csconfig';
import Cursors from '@fortitan/shared/Cursors';
import GameObjectGroup from '../objects/GameObjectGroup.matter';
import { BODY_ENTITIES } from '../../config/physics.config';
import SyncManager from '../../managers/syncManager';

export default class MatterScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainScene', plugins: DEBUG_CS.physics ? null : ['Clock'] });

    this.objects = [];
    this.objectsToSync = {};
    this.debug = {};
    this.tick = 0;
    // level;
    // roomManager;
    // roomId;

    // see all scene plugins:
    // Phaser.Plugins.DefaultScene
    // https://github.com/photonstorm/phaser/blob/master/src/plugins/DefaultPlugins.js#L76
  }

  init() {
    // const { level = 0, roomId, roomManager } = this.game.config.preBoot();
    // this.level = level;
    // this.roomManager = roomManager;
    // this.roomId = roomId;
  }

  create() {
    const { Matter } = Phaser.Physics.Matter;

    // add and modify the world bounds
    const bounds = this.matter.world.setBounds();

    // add and modify the world bounds
    Object.keys(bounds.walls).forEach(key => {
      const body = bounds.walls[key];
      Matter.Body.set(body, {
        friction: 0.05,
        frictionStatic: 0.05,
        frictionAir: 0.01,
      });
      // we do not need the top, so we set it to isSensor
      if (key === 'top') Matter.Body.set(body, { isSensor: true });
    });

    // instantiate the GameObjectGroup
    const gameObjectGroup = new GameObjectGroup(this, this.objects);

    // this will stop the scene
    this.events.addListener('stopScene', () => {
      this.objects.forEach(obj => {
        this.matter.world.remove(this.matter.world, obj.body);
      });
      // this.roomManager.stats.removeTotalObjects(this.roomId)
      this.scene.stop();
      // this.roomManager.stats.log(`Scene in roomId <b>${this.roomId}</b> has stopped!`)
    });

    // creates a new dude, when a new user connects
    this.events.addListener('createDude', (clientId, socketId) => {
      const initState = BODY_ENTITIES.players.state.position;

      gameObjectGroup.add(initState.x, initState.y, 'players', {
        clientId,
        socketId,
      });
    });

    // updates the position of a dude
    this.events.addListener('U', res => {
      const dudes = this.objects.filter(
        obj => obj.clientId && obj.clientId === res.clientId
      );
      if (dudes[0]) {
        const b = res.updates;
        const updates = {
          left: !!(b === 1 || b === 5),
          right: !!(b === 2 || b === 6),
          up: !!(b === 4 || b === 6 || b === 5),
          none: b === 8,
        };
        dudes[0].setUpdates(updates);
      }
    });

    // removes a dude
    // this.events.addListener('removeDude', clientId => {
    //   const dudes = this.objects.filter(
    //     obj => obj.clientId && obj.clientId === clientId
    //   );
    //   dudes.forEach(dude => dude.kill());
    // });

    // adds another box every 1.2 seconds
    // this.time.addEvent({
    //   delay: 1200,
    //   loop: true,
    //   callback: () => {
    //     let x = Phaser.Math.RND.integerInRange(worldCenterX - 250 - 640, worldCenterX + 640 + 250)
    //     let y = 100
    //     gameObjectGroup.add(x, y, SKINS.BOX)
    //   }
    // })

    if (DEBUG_CS.physics) {
      this.add
        .text(24, 24, 'Physics Debugging Version\nMove with Arrow Keys', {
          fontSize: 36,
        })
        .setScrollFactor(0)
        .setOrigin(0)
        .setAlpha(0.6);
      this.debug.socket = { emit: () => {} }; // mock socket
      this.debug.cursors = new Cursors(this, this.debug.socket);
      this.debug.dude = gameObjectGroup.add(400, 400, TYPES.player, {
        clientId: 55555,
        socketId: 'some-socket-id',
      });
    }

    if (!DEBUG_CS.physics) {
      this.time.addEvent({
        delay: 5000,
        loop: true,
        callback: () => {
          this.roomManager.stats.setTotalObjects(
            this.roomId,
            this.objects.length
          );
        },
      });
    }

    // add the big star
    // gameObjectGroup.add(worldCenterX, WORLD_CS.height - 320 - 100 - 115, SKINS.STAR, {
    //   category: 'big'
    // })

    // check for collisions
    const collisionEvent = event => {
      event.pairs.forEach(pair => {
        const { bodyA, bodyB } = pair;
        const labels = [bodyA.label, bodyB.label];

        // Dude hits star
        if (labels.includes('dude') && labels.includes('star')) {
          const starBody = bodyA.label === 'star' ? bodyA : bodyB;
          const star = gameObjectGroup.getObjectById(starBody.id);
          if (star) {
            star.kill();
            star.setReviveTimer();
          }
        }

        // Dude's sensor hits another body
        if (/Sensor/.test(bodyA.label) || /Sensor/.test(bodyB.label)) {
          const sensorBody = /Sensor/.test(bodyA.label) ? bodyA : bodyB;
          const otherBody = /Sensor/.test(bodyA.label) ? bodyB : bodyA;
          if (otherBody.isSensor) return;

          const dude = gameObjectGroup.getObjectById(sensorBody.parent.id);
          if (dude) {
            let sepPadding = 2;
            if (otherBody.isStatic) {
              sepPadding = 0.1;
            }

            const sep = pair.separation - sepPadding;

            if (sensorBody === dude.sensors.left) {
              dude.move.leftAllowed = !otherBody.isStatic;
              dude.touching.left = true;
              if (pair.separation > sepPadding) {
                dude.setTranslate(sep);
                dude.translate();
              }
            } else if (sensorBody === dude.sensors.right) {
              dude.move.rightAllowed = !otherBody.isStatic;
              dude.touching.right = true;
              if (pair.separation > sepPadding) {
                dude.setTranslate(-sep);
                dude.translate();
              }
            } else if (sensorBody === dude.sensors.bottom) {
              dude.touching.bottom = true;
            }
          }
        }
      });
    };
    // https://itnext.io/modular-game-worlds-in-phaser-3-tilemaps-5-matter-physics-platformer-d14d1f614557
    this.matter.world.on('collisionstart', collisionEvent);
    this.matter.world.on('collisionactive', collisionEvent);
  }

  /** Sends the initial state to the client */
  getInitialState() {
    const objects = [];
    SyncManager.prepareFromMatterGameObject(this.objects, objects);
    return SyncManager.encode(objects);
  }

  update() {
    this.tick++;
    if (this.tick > 1000000) this.tick = 0;

    if (DEBUG_CS.physics) {
      this.debug.cursors.update();
      const cursorsDown = this.debug.cursors.cursorsDown();
      const { dude } = this.debug;
      dude.setUpdates(cursorsDown);
      dude.update();
      this.cameras.main.setScroll(
        dude.body.position.x - this.cameras.main.width / 2,
        dude.body.position.y - this.cameras.main.height / 2
      );
    }

    if (!DEBUG_CS.physics) {
      this.objects.forEach(obj => {
        if (obj.body.position.y > WORLD_CS.height) obj.kill();

        obj.preUpdate();
        obj.update();

        const roundToEvenNumber = number => {
          try {
            return +(Math.round(number / 2) * 2).toFixed(0);
          } catch (e) {
            return 0;
          }
        };

        // only send the object to the client if one of these properties have changed
        const dead = obj.dead !== obj.prevDead;
        const x =
          obj.body.position.x.toFixed(0) !== obj.body.positionPrev.x.toFixed(0);
        const y =
          obj.body.position.y.toFixed(0) !== obj.body.positionPrev.y.toFixed(0);
        const angle =
          roundToEvenNumber(obj.angle) !== roundToEvenNumber(obj.prevAngle);
        const animation = obj.animation !== obj.prevAnimation;
        if (dead || x || y || angle || animation) {
          const theObj = {
            // it always needs to have an id!
            id: obj.body.id,
            x: +obj.body.position.x.toFixed(0),
            y: +obj.body.position.y.toFixed(0),
            angle: angle ? roundToEvenNumber(obj.angle) : null,
            dead: dead ? obj.dead : null,
            animation: obj.animation ? obj.animation : null,
            clientId: obj.clientId ? obj.clientId : null,
            skin: obj.skin,
          };
          const cleanObjectToSync = SyncManager.cleanObjectToSync(theObj);
          this.objectsToSync = SyncManager.mergeObjectToSync(
            cleanObjectToSync,
            this.objectsToSync
          );
        }

        // call the postUpdate function on all gameObjects
        obj.postUpdate();
      });

      const send = [];
      Object.keys(this.objectsToSync).forEach(key => {
        // this syncs the dude on every frame
        // but the boxes only on every second frame
        // (safes a lot of bandwidth)
        if (this.objectsToSync[key].skin === TYPES.BOX) {
          if (this.tick % 2 === 0) {
            send.push(this.objectsToSync[key]);
            delete this.objectsToSync[key];
          }
        } else {
          send.push(this.objectsToSync[key]);
          delete this.objectsToSync[key];
        }
      });

      if (send.length > 0) {
        // send the objects to sync to all connected clients in this.roomId
        this.roomManager.ioNspGame
          .in(this.roomId)
          .emit('S' /* short for syncGame */, {
            O /* short for objects */: SyncManager.encode(send),
          });
      }
    }
  }
}
