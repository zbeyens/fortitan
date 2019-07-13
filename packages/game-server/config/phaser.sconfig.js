import Phaser from 'phaser';

export const GAME_CONFIG_S = {
  type: Phaser.HEADLESS,
  parent: 'phaser-game',
  width: 1280,
  height: 720,
  banner: false,
  audio: false,
  physics: {
    default: 'matter',
    matter: {
      gravity: {
        y: 2,
      },
    },
  },
};
