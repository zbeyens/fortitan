import MyGameEngine from '../../../shared/MyGameEngine';
import EntityFactoryV from './world/EntityFactoryV';

/**
 * Game engine of the client.
 */
export default class MyGameEngineV extends MyGameEngine {

    constructor() {
        super();

        this.entityFactory = new EntityFactoryV(this);
    }

}
