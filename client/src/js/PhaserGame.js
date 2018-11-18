import Stats from 'stats.js';
import BootScene from './scene/BootScene';
import PreloaderScene from './scene/PreloaderScene';
import MainMenuScene from './scene/MainMenuScene';
import GameScene from './scene/GameScene';
import cfg from './config';


/**
 * The Renderer is the component which must draw the game on the client.
 * Uses Phaser. It is accessible from every Phaser object (Phaser.Sprite,...) using the 'game' member
 * It will be instantiated once on each client.
 */
export default class PhaserGame extends Phaser.Game {

    /**
     * Constructor of the Renderer singleton.
     * @param {ClientEngine} clientEngine - Reference to the ClientEngine instance.
     */
    constructor(clientEngine) {
        // Create your Phaser game and inject it into the `#content` div.
        super(cfg.phaserConfig);

        this.clientEngine = clientEngine;
        this.gameEngine = clientEngine.gameEngine;

        // Add the Scenes your game has.
        this.state.add('BootScene', BootScene);
        this.state.add('PreloaderScene', PreloaderScene);
        this.state.add('MainMenuScene', MainMenuScene);
        this.state.add('GameScene', GameScene);

        // Now start the Boot scene.
        this.state.start('BootScene');

        // Handle debug mode.
        if (cfg.debug.stats) {
            this.setupStats();
        }
    }

    /**
     * Display the FPS and MS using Stats.js.
     */
    setupStats() {
        // Setup the new stats panel.
        const stats = new Stats();
        stats.dom.style.position = 'absolute';
        stats.dom.style.top = '0';
        stats.dom.style.left = '80%';

        document.body.appendChild(stats.dom);

        // Monkey-patch the update loop so we can track the timing.
        const updateLoop = this.update;

        this.update = (...args) => {
            stats.begin();
            updateLoop.apply(this, args);
            stats.end();
        };
    }

}