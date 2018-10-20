import PlayerV from './PlayerV'


export default class EntityViewFactory {

	constructor(gameEngine) {
		this.gameEngine = gameEngine;
	}

	createEntity(type, entity) {
		let newEntity = null;
		
		if (type === 'players')
			newEntity = new PlayerV(entity);

		return newEntity;
	}

}