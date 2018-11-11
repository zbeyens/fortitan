import GameEngine from 'iogine/GameEngine';
import cfg from './config';


export default class MyGameEngine extends GameEngine {

	// constructor() {
	// 	super();
	// }

	start() {
		super.start();

        for (const entityType of cfg.entityTypes) {
            this.world.addEntityType(entityType);
        }
	}

    step(t, dt) {
        super.step(t, dt);
    }

    /**
     * Create a new entity and add it to the world.
     * 
     * @param  {String} type    entity type
     * @return {Object} entityUpdate    world update    
     */
    addEntity(type, entityUpdate) {
        const id = this.world.getNewId(type);

        const entity = this.entityFactory.createEntity(type, {
            id,
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
    
    createLevel() {
        this.createGround();
    }
    
    createGround() {
        const type = 'grounds';

        const state = {};

        const props = cfg.grounds.props;

        const tilesX = cfg.grounds.tile.position.x;
        const tilesY = cfg.grounds.tile.position.y;
        const tilesWidth = cfg.grounds.tile.width;
        const tilesHeight = cfg.grounds.tile.height;
        props.body.width = tilesWidth * cfg.tileSize;
        props.body.height = tilesHeight * cfg.tileSize;

        state.position = {
            x: tilesX * cfg.tileSize + props.body.width / 2,
            y: tilesY * cfg.tileSize + props.body.height / 2
        };

        const entity = { 
            state,
            props
        };

        const newEntity = this.addEntity(type, entity);
        return newEntity;
    }

}