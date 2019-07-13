import { GameEngine } from 'iogine';
import { WORLD_CS } from './config/world.csconfig';
// import { WORLD_CS } from './config/world.csconfig';

export default class MyGameEngine extends GameEngine {
  createLevel() {
    this.createGround();
  }

  createGround() {
    const type = 'grounds';

    const id = this.world.getNewId(type);

    const initState = {};

    const tilesX = WORLD_CS.grounds.tile.position.x;
    const tilesY = WORLD_CS.grounds.tile.position.y;
    const tilesWidth = WORLD_CS.grounds.tile.width;
    const tilesHeight = WORLD_CS.grounds.tile.height;
    const initProps = {
      type,
      body: {
        width: tilesWidth * WORLD_CS.tileSize,
        height: tilesHeight * WORLD_CS.tileSize,
      },
    };

    initState.position = {
      x: tilesX * WORLD_CS.tileSize + initProps.body.width / 2,
      y: tilesY * WORLD_CS.tileSize + initProps.body.height / 2,
    };

    const newEntity = this.createEntity(type, id, initState, initProps);
    return newEntity;
  }
}
