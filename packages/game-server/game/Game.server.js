import '../mock/browser.mock';
import Phaser from 'phaser';
import MatterScene from './scenes/Matter.scene';
import { GAME_CONFIG_S } from '../config/phaser.sconfig';

const GameServer = (roomManager, roomId, options) => {
  const config = { ...GAME_CONFIG_S };
  config.scene = [MatterScene];
  config.customEnvironment = true;

  // a very hackie trick to pass some custom data
  // but it work well :)
  config.callbacks = {
    preBoot: () => {
      return { level: +options.level, roomManager, roomId };
    },
  };

  return new Phaser.Game(config);
};
export default GameServer;
