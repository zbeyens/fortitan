import PlayerV from './PlayerV';
import GroundV from './GroundV';
import TreeV from './TreeV';
import PickaxeV from './PickaxeV';

export default class EntityFactoryV {

	constructor(gameEngine) {
		this.gameEngine = gameEngine;
	}

	createEntity(type, id, initState, initProps) {
		let newEntity = null;

		if (type === 'players') 
			newEntity = new PlayerV(id, initState, initProps);
		if (type === 'grounds') 
			newEntity = new GroundV(id, initState, initProps);
		if (type === 'trees') 
			newEntity = new TreeV(id, initState, initProps);
		if (type === 'pickaxes') 
			newEntity = new PickaxeV(id, initState, initProps);
		
		return newEntity;
	}

}