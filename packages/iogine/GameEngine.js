import EventEmitter from 'eventemitter3';
import GameWorld from 'iogine/world/GameWorld';
import { TYPES } from '@fortitan/shared/config/world.csconfig';
// import Timer from 'iogine/util/Timer';

/**
 * The GameEngine contains the game logic. Extend this class
 * to implement game mechanics. One instance runs once on the server,
 * where the final decisions are always taken,
 * and one instance can be run on each client as well,
 * where the client emulates what it expects to be happening
 * on the server (extrapolation, not yet implemented).
 *
 * The game engine's logic must listen to user inputs and
 * act on these inputs to change the game state.
 * For example, the game engine listens to controller/keyboard inputs to infer
 * movement for the player. The game engine listens
 * to clicks, button-presses, etc..
 *
 * Note that the game engine may be run on both the server and on the
 * clients - but the server decisions always have the final say,
 * and therefore clients must resolve server updates which conflict
 * with client-side predictions.
 *
 * The GameEngine is responsible for creating entities.
 * Creation is not done in the constructor of the entity because its state
 * can be dependent from another entity.
 */
export default class GameEngine {
  /**
   * Extends the event emitter.
   * NOTE: not important at the moment.
   */
  constructor(cfg) {
    this.cfg = cfg;
    Object.assign(this, new EventEmitter(), EventEmitter.prototype);
  }

  /**
   * Start the game.
   * Extending the start method is useful
   * for setting up the game's worldSettings attribute,
   * and registering methods on the event handler.
   */
  start() {
    console.info('========== game engine started ==========');

    console.log('world');
    this.world = new GameWorld(TYPES);
    console.log(this);
  }

  /**
   * Single game step.
   * Update all the entities of the world
   * @param {Number} t - the current time
   * @param {Number} dt - elapsed time since last step was called
   */
  step(dt) {
    // let step = ++this.world.stepCount;
    ++this.world.stepCount;

    const { entities } = this.world;
    for (const entityType of Object.keys(entities)) {
      for (const id of Object.keys(entities[entityType])) {
        const entity = entities[entityType][id];
        entity.update(dt);
      }
    }
  }

  /**
   * Override this function to implement input handling.
   * This method will be called on the server
   * when the input reaches the server. The input is also associated with
   * the ID of a player.
   * @param {Object} inputMsg - input descriptor object
   * @param {Number} socketId - the socket ID
   */
  processInput(inputMsg, socketId) {}

  /**
   * Add an entity to the game world.
   * @param {String} type - the entity type.
   * @param {Entity} entity - the entity object.
   * @return {Entity} entity - the final entity.
   */
  addEntityToWorld(type, entity) {
    this.world.addEntity(type, entity);

    return entity;
  }

  /**
   * Remove an entity from the game world.
   * @param {String} type - the entity type
   * @param {Number} entityId - the entity ID
   */
  removeEntityFromWorld(type, entityId) {
    const entity = this.world.entities[type][entityId];

    if (!entity) {
      console.info(
        `Game attempted to remove a game entity which doesn't (or never did) exist, id=${entityId}`
      );
    }

    entity.onRemoveFromWorld(this);

    this.world.removeEntity(type, entityId);
  }

  /**
   * Create a new entity and add it to the world.
   *
   * @param  {String} type    entity type
   * @return {Object} entityUpdate    world update
   */
  createEntity(type, id, initState, initProps) {
    const entity = this.entityFactory.createEntity(
      type,
      id,
      initState,
      initProps
    );
    this.addEntityToWorld(type, entity);

    return entity;
  }

  /**
   * Update entity from the world update
   *
   * @param  {String} type    entity type
   * @return {Object} entityUpdate    world update
   */
  updateEntity(type, entityUpdate) {
    const entity = this.world.entities[type][entityUpdate.id];
    entity.state = entityUpdate.state;

    return entity;
  }
}

/**
 * Check if a given object is owned by the player on this client
 * @param {Object} object the game object to check
 * @return {Boolean} true if the game object is owned by the player on this client
 */
// isOwnedByPlayer(object) {
//     return object.playerId === this.playerId;
// }

/**
 * Register Game Object Classes
 * @example
 * registerClasses(serializer) {
 *   serializer.registerClass(require('../common/Paddle'));
 *   serializer.registerClass(require('../common/Ball'));
 * }
 * @param {Serializer} serializer - the serializer
 */
// registerClasses(serializer) {}

// start() {
//     console.log('========== game engine started ==========');
//     this.initWorld();

//     // create the default timer
//     // this.timer = new Timer();
//     // this.timer.play();
//     // this.on('postStep', (step) => {
//     //     this.timer.tick();
//     // });

//     // this.emit('start', {
//     //     timestamp: (new Date()).getTime()
//     // });
// }

/**
 * EVENTS
 */

/**
 * Marks the beginning of a new game step
 *
 * @event GameEngine#preStep
 * @param {Number} stepNumber - the step number
 * @param {Boolean} isReenact - is this step a re-enactment
 */

/**
 * Marks the end of a game step
 *
 * @event GameEngine#postStep
 * @param {Number} stepNumber - the step number
 * @param {Boolean} isReenact - is this step a re-enactment
 */

/**
 * An object has been added to the world
 *
 * @event GameEngine#objectAdded
 * @param {Object} obj - the new object
 */

/**
 * An object has been removed from the world
 *
 * @event GameEngine#objectDestroyed
 * @param {Object} obj - the object
 */

/**
 * A player has joined
 *
 * @event GameEngine#playerJoined
 * @param {Number} joinTime - epoch of join time
 * @param {Object} playerDesc - player descriptor
 * @param {String} playerDesc.playerId - the player ID
 */

/**
 * A player has left
 *
 * @event GameEngine#playerDisconnected
 * @param {Number} joinTime - epoch of join time
 * @param {Number} disconnectTime - epoch of disconnect time
 * @param {Object} playerDesc - player descriptor
 * @param {String} playerDesc.playerId - the player ID
 */

/**
 * A player has joined on the server
 *
 * @event GameEngine#server__playerJoined
 * @param {Number} joinTime - epoch of join time
 * @param {Object} playerDesc - player descriptor
 * @param {String} playerDesc.playerId - the player ID
 */

/**
 * A player has left on the server
 *
 * @event GameEngine#server__playerDisconnected
 * @param {Number} joinTime - epoch of join time
 * @param {Number} disconnectTime - epoch of disconnect time
 * @param {Object} playerDesc - player descriptor
 * @param {String} playerDesc.playerId - the player ID
 */

/**
 * A synchronization update arrived from the server
 *
 * @event GameEngine#syncReceived
 * @param {Object} sync - the synchronization object
 */

/**
 * Marks the beginning of a game step on the client
 *
 * @event GameEngine#client__preStep
 */

/**
 * Marks the end of a game step on the client
 *
 * @event GameEngine#client__postStep
 */

/**
 * An input needs to be handled.  Emitted just before the GameEngine
 * method processInput is invoked.
 *
 * @event GameEngine#processInput
 * @param {Object} input - input descriptor object
 * @param {String} input.input - describe the input (e.g. "up", "down", "fire")
 * @param {Number} input.messageIndex - input identifier
 * @param {Object} input.options - the object which was passed as SendInput's InputOptions parameter
 * @param {Number} input.step - input execution step
 * @param {Number} playerId - the player ID
 */

/**
 * An input needs to be handled.
 * This event is emitted on the server only, just before the
 * general processInput event.
 *
 * @event GameEngine#server__processInput
 * @param {Object} input - input descriptor object
 * @param {String} input.input - describe the input (e.g. "up", "down", "fire")
 * @param {Number} input.messageIndex - input identifier
 * @param {Object} input.options - the object which was passed as SendInput's InputOptions parameter
 * @param {Number} input.step - input execution step
 * @param {Number} playerId - the player ID
 */

/**
 * An input needs to be handled.
 * This event is emitted on the client only, just before the
 * general processInput event.
 *
 * @event GameEngine#client__processInput
 * @param {Object} input - input descriptor object
 * @param {String} input.input - describe the input (e.g. "up", "down", "fire")
 * @param {Number} input.messageIndex - input identifier
 * @param {Object} input.options - the object which was passed as SendInput's InputOptions parameter
 * @param {Number} input.step - input execution step
 * @param {Number} playerId - the player ID
 */

/**
 * Client received a sync from the server
 *
 * @event GameEngine#client__syncReceived
 * @param {Object} sync - sync from the server
 * @param {Array} syncEvents - array of events in the sync
 * @param {Number} maxStepCount - highest step in the sync
 */

/**
 * Client reset the world step
 *
 * @event GameEngine#client__stepReset
 * @param {Object} resetDesc - sync from the server
 * @param {Number} oldStep - the old step count
 * @param {Number} newStep - the new step count
 */

/**
 * Marks the beginning of a game step on the server
 *
 * @event GameEngine#server__preStep
 * @param {Number} stepNumber - the step number
 */

/**
 * Marks the end of a game step on the server
 *
 * @event GameEngine#server__postStep
 * @param {Number} stepNumber - the step number
 */

/**
 * User input received on the server
 *
 * @event GameEngine#server__inputReceived
 * @param {Object} input - input descriptor
 * @param {Object} input.data - input descriptor
 * @param {String} input.playerId - player that sent the input
 */

/**
 * Report slow frame rate on the browser.
 * The browser did not achieve a reasonable frame rate
 *
 * @event GameEngine#client__slowFrameRate
 */

/**
 * server has started
 *
 * @event GameEngine#start
 * @param {Number} timestamp - UTC epoch of start time
 */
