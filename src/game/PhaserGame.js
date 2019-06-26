import Phaser from 'phaser';
import { GAME_CONFIG } from 'config/phaser.config';
import Stats from 'stats.js';
import { DEBUG } from 'config/debug.config';
import PreloaderScene from './scenes/Preloader/Preloader.scene';
import MainMenuScene from './scenes/MainMenu/MainMenu.scene';
import GameScene from './scenes/Game/Game.scene';

/**
 * The Renderer is the component which must draw the game on the client.
 * Uses Phaser. It is accessible from every Phaser object (Phaser.Sprite,...) using the 'game' member
 * It will be instantiated once on each client.
 */
export default class PhaserGame extends Phaser.Game {
  /**
   * Constructor of the Renderer singleton.
   */
  constructor(clientEngine) {
    // Create your Phaser game and inject it into the `#content` div.
    super(GAME_CONFIG);

    this.clientEngine = clientEngine;
    this.gameEngine = clientEngine.gameEngine;

    // Add the Scenes your game has.
    this.scene.add('PreloaderScene', PreloaderScene);
    this.scene.add('MainMenuScene', MainMenuScene);
    this.scene.add('GameScene', GameScene);

    // Now start the Boot scene.
    this.scene.start('PreloaderScene');

    // Handle debug mode.
    if (DEBUG.stats.on) {
      this.setupStats();
    }
  }

  /**
   * Display the FPS and MS using Stats.js.
   */
  setupStats() {
    const stats = new Stats();
    stats.dom.style.position = 'absolute';
    stats.dom.style.top = DEBUG.stats.top;
    stats.dom.style.left = DEBUG.stats.left;

    document.body.appendChild(stats.dom);

    // Add listener to these events
    this.events.on(Phaser.Core.Events.PRE_STEP, () => {
      stats.begin();
    });

    this.events.on(Phaser.Core.Events.POST_RENDER, () => {
      stats.end();
    });
  }
}
