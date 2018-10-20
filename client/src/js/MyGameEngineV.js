import MyGameEngine from '../../../shared/MyGameEngine'
import GameWorld from '../../../shared/GameWorld'
import EntityFactoryV from './world/entity/EntityFactoryV'


export default class MyGameEngineV extends MyGameEngine {

    constructor() {
        super();

        this.entityFactory = new EntityFactoryV();
    }

    registerClasses(serializer) {}


}