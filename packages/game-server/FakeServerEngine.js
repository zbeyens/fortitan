import MyServerEngine from './MyServerEngine';

/**
 * Fake server runned on the client to test the game without latency
 */
export default class FakeServerEngine extends MyServerEngine {

	// TODO: thiss
    /**
     * Just send all the entities for the world update
     * TODO: serialize
     * @return {Object} entities
     */
    serializeUpdate() {
        return this.gameEngine.world.entities;
    }
    
}