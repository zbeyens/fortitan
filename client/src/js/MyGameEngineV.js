import MyGameEngine from '../../../shared/MyGameEngine';
import EntityFactoryV from './world/EntityFactoryV';


export default class MyGameEngineV extends MyGameEngine {

    constructor() {
        super();

        this.entityFactory = new EntityFactoryV(this);
    }

}

// registerClasses(serializer) {}