import Player from './Player';
import Ground from './Ground';


export default class EntityFactory {

	constructor(gameEngine) {
		this.gameEngine = gameEngine;
	}

	createEntity(type, entity) {
		entity.engine = this.gameEngine.physicsEngine;

		let newEntity = null;
		
		if (type === 'players')
			newEntity = new Player(entity);
		if (type === 'grounds')
			newEntity = new Ground(entity);

		return newEntity;
	}

}