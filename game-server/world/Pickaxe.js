import DynamicEntity from 'iogine/world/DynamicEntity';
import PickaxePhysics from './physics/PickaxePhysics';


export default class Pickaxe extends DynamicEntity {
	constructor(id, initState, initProps, gameEngine) {
		super(id, initState, initProps, gameEngine);

		this.physics = new PickaxePhysics(this, gameEngine.physicsEngine);
	}

	update(dt) {}

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