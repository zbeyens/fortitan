import MyGameEngine from '../../../shared/MyGameEngine';
import EntityFactoryV from './world/entity/EntityFactoryV';


export default class MyGameEngineV extends MyGameEngine {

    constructor() {
        super();

        this.entityFactory = new EntityFactoryV(this);
    }

    // addEntity(type, entityUpdate) {

    // }



}

// registerClasses(serializer) {}