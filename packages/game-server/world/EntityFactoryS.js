import Player from './Player';
import Ground from './Ground';
import Tree from './Tree';
import Pickaxe from './Pickaxe';

export default class EntityFactoryS {

	constructor(gameEngine) {
		this.gameEngine = gameEngine;
	}

	createEntity(type, id, initState, initProps) {
		const gameEngine = this.gameEngine;
		let newEntity = null;

		if (type === 'players') 
			newEntity = new Player(id, initState, initProps, gameEngine);
		if (type === 'grounds') 
			newEntity = new Ground(id, initState, initProps, gameEngine);
		if (type === 'trees') 
			newEntity = new Tree(id, initState, initProps, gameEngine);
		if (type === 'pickaxes') 
			newEntity = new Pickaxe(id, initState, initProps, gameEngine);
		
		return newEntity;
	}

}