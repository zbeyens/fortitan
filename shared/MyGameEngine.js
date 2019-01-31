import GameEngine from 'iogine/GameEngine';
import cfg from './config';

export default class MyGameEngine extends GameEngine {
  constructor() {
    super(cfg);
  }

  createLevel() {
    this.createGround();
  }

  createGround() {
    const type = 'grounds';

    const id = this.world.getNewId(type);

    const initState = {};

    const tilesX = cfg.grounds.tile.position.x;
    const tilesY = cfg.grounds.tile.position.y;
    const tilesWidth = cfg.grounds.tile.width;
    const tilesHeight = cfg.grounds.tile.height;
    const initProps = {
      type,
      body: {
        width: tilesWidth * cfg.tileSize,
        height: tilesHeight * cfg.tileSize,
      },
    };

    initState.position = {
      x: tilesX * cfg.tileSize + initProps.body.width / 2,
      y: tilesY * cfg.tileSize + initProps.body.height / 2,
    };

    const newEntity = this.createEntity(type, id, initState, initProps);
    return newEntity;
  }
}
