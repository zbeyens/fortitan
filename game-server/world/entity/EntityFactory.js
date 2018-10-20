import Player from './Player'


export default class EntityFactory {

	constructor(gameEngine) {
		this.gameEngine = gameEngine;
	}

	createEntity(type, entity) {
		entity.engine = this.gameEngine.physicsEngine;

		let newEntity = null;
		
		if (type === 'players')
			newEntity = new Player(entity);

		return newEntity;
	}

}