import Player from './Player';
import Ground from './Ground';


export default class EntityFactoryS {

	constructor(gameEngine) {
		this.gameEngine = gameEngine;
	}

	createEntity(type, id, initState, initProps) {
		const physicsEngine = this.gameEngine.physicsEngine;
		let newEntity = null;
		
		if (type === 'players')
			newEntity = new Player(id, initState, initProps, physicsEngine);
		if (type === 'grounds')
			newEntity = new Ground(id, initState, initProps, physicsEngine);


		return newEntity;
	}

}