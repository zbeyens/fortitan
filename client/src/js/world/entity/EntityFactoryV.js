import PlayerV from './PlayerV';
import GroundV from './GroundV';


export default class EntityViewFactory {

	constructor(gameEngine) {
		this.gameEngine = gameEngine;
	}

	createEntity(type, entity) {
		let newEntity = null;
		
		if (type === 'players')
			newEntity = new PlayerV(entity);
		if (type === 'grounds')
			newEntity = new GroundV(entity);

		return newEntity;
	}

}