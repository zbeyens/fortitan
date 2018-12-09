import State from "iogine/world/State";
import DynamicEntity from "iogine/world/DynamicEntity";
import PickaxePhysics from "./physics/PickaxePhysics";
import PickaxeUseState from "./state/PickaxeUseState";
import PickaxeMoveState from "./state/PickaxeMoveState";

export default class Pickaxe extends DynamicEntity {
  constructor(id, initState, initProps, gameEngine) {
    super(id, initState, initProps, gameEngine);

    this.physics = new PickaxePhysics(this, gameEngine.physicsEngine);

    this.initState();
  }

  initState() {
    this.enterMoveState();
    this.enterUseIdleState();
  }

  update(dt) {
    this.moveState.update(dt);
    this.useState.update(dt);
  }

  enterUseIdleState() {
    this.useState = new State(this);
  }

  enterUseState() {
    this.useState = new PickaxeUseState(this);
  }

  enterMoveState() {
    this.moveState = new PickaxeMoveState(this);
  }
}

/**
 * msg worldUpdate
 *
 * player: {
 *  id
 *  state: {
 *    usingItem: 'pickaxe'
 *    hitting: true,
 *  }
 * }
 *
 * pickaxe: {
 * 	ownerId: playerId
 * }
 *
 * when owner by a player NOT TO DO,
 * only when on ground:
 * pickaxe: {
 *  id,
 *  state: {
 *  	position,
 *  }
 * }
 *
 * client receive msg:
 *
 * find entityV with ownerId
 * update pickaxeV state position to entity.position
 *
 */
