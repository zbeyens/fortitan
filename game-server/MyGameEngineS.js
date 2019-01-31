import MyPhysicsEngine from './physics/MyPhysicsEngine';
import MyGameEngine from '../shared/MyGameEngine';
import EntityFactoryS from './world/EntityFactoryS';
import cfg from './config';

/**
 * Game engine of the server
 */
export default class MyGameEngineS extends MyGameEngine {
  /**
   * Init the physics engine.
   * Init the entity factory.
   */
  constructor() {
    super();

    this.physicsEngine = new MyPhysicsEngine(this);
    this.entityFactory = new EntityFactoryS(this);
  }

  /**
   * Create the level of the game.
   */
  start() {
    super.start();

    this.createLevel();
  }

  /**
   * Find the player entity with the socket id to handle its input.
   * @param  {Object} data - the input
   * @param  {Number} socketId - the socket id
   */
  processInput(data, socketId) {
    let player;
    for (const id of Object.keys(this.world.entities.players)) {
      const p = this.world.entities.players[id];
      if (p.socketId === socketId) player = p;
    }

    if (player) {
      player.handleInput(data);
    }
  }

  /**
   * Update the physics engine.
   * Update the game engine.
   * @param  {Number} t
   * @param  {Number} dt
   */
  step(dt) {
    this.physicsEngine.step(dt);

    super.step(dt);
  }

  createLevel() {
    super.createLevel();

    for (let i = 0; i < cfg.trees.amount; i++) {
      const treeMarginFactor = 400;
      const randomFactor = 50;
      const position = {
        x: Math.random() * randomFactor + i * treeMarginFactor,
        y: 650,
      };
      this.createTree(position);
    }
  }

  /**
   * Creates a new player, adds it to the game world
   * TODO: we can place it randomly and set the props from the user input
   */
  createPlayer() {
    const type = 'players';

    const id = this.world.getNewId(type);

    const initState = cfg[type].state;
    const initProps = {
      type,
    };

    const newEntity = this.createEntity(type, id, initState, initProps);
    return newEntity;
  }

  /**
   * Creates a new tree, adds it to the game world
   * TODO: we can place it randomly and set the props from the user input
   */
  createTree(position) {
    const type = 'trees';

    const id = this.world.getNewId(type);

    const initState = {
      position,
    };
    const initProps = {
      body: cfg.trees.body,
      type,
    };

    const newEntity = this.createEntity(type, id, initState, initProps);
    return newEntity;
  }

  createPickaxe(owner) {
    const type = 'pickaxes';

    const id = this.world.getNewId(type);

    const ownerPos = owner.state.position;
    const initState = {
      owner,
      position: {
        x: ownerPos.x,
        y: ownerPos.y,
      },
    };
    const initProps = {
      body: cfg.pickaxes.body,
      type,
    };

    const newEntity = this.createEntity(type, id, initState, initProps);
    owner.inventory.add(newEntity);

    return newEntity;
  }
}

// registerClasses(serializer){
//     serializer.registerClass(Ship);
//     serializer.registerClass(Missile);
// }

// makeMissile(playerShip, inputId) {
//     let missile = new Missile(this);

//      we want the missile location and velocity to correspond to that of the ship firing it
//     missile.position.copy(playerShip.position);
//     missile.velocity.copy(playerShip.velocity);
//     missile.angle = playerShip.angle;
//     missile.playerId = playerShip.playerId;
//     missile.ownerId = playerShip.id;
//     missile.inputId = inputId;  this enables usage of the missile shadow object
//     missile.velocity.x += Math.cos(missile.angle * (Math.PI / 180)) * 10;
//     missile.velocity.y += Math.sin(missile.angle * (Math.PI / 180)) * 10;

//     this.trace.trace(() => `missile[${missile.id}] created vel=${missile.velocity}`);

//     let obj = this.addEntityToWorld(missile);

//      if the object was added successfully to the game world, destroy the missile after some game ticks
//     if (obj)
//         this.timer.add(30, this.destroyMissile, this, [obj.id]);

//     return missile;
// }

// destroy the missile if it still exists
// destroyMissile(missileId) {
//     if (this.world.entities[missileId]) {
//         this.trace.trace(() => `missile[${missileId}] destroyed`);
//         this.removeEntityFromWorld(missileId);
//     }
// }
