import MyGameEngine from '@fortitan/shared/MyGameEngine';
import EntityFactoryV from 'game/scenes/Game/world/EntityFactoryV';

/**
 * Game engine of the client.
 */
export default class MyGameEngineV extends MyGameEngine {
  constructor() {
    super();

    this.entityFactory = new EntityFactoryV(this);
  }
}
