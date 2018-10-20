import GameEngine from './GameEngine'


export default class MyGameEngine extends GameEngine {

	constructor() {
		super();
	}

	start() {
		super.start();

		this.world.addEntityType('players');
		this.world.addEntityType('resources');
	}

    step(t, dt) {
        super.step(t, dt);
    }

    /**
     * Create a new entity and add it to the world
     * 
     * @param  {String} type    entity type
     * @return {Object} entityUpdate    world update    
     */
    addEntity(type, entityUpdate) {
        let entity = this.entityFactory.createEntity(type, {
            id: entityUpdate.id,
            state: entityUpdate.state,
            props: entityUpdate.props,
        });

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