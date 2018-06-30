import Stats from 'stats.js';
import BootScene from './scenes/BootScene';
import PreloaderScene from './scenes/PreloaderScene';
import MainMenuScene from './scenes/MainMenuScene';
import GameScene from './scenes/GameScene';
import ccfg from './config';

/**
 * Phaser Game object. It is accessible from every Phaser object (Phaser.Sprite,...) from the 'game' member 
 */
class Game extends Phaser.Game {

    constructor(conf) {
        // Create your Phaser game and inject it into the `#content` div.
        super(conf);

        // Add the States your game has.
        this.state.add('BootScene', BootScene);
        this.state.add('PreloaderScene', PreloaderScene);
        this.state.add('MainMenuScene', MainMenuScene);
        this.state.add('GameScene', GameScene);

        // Now start the Boot state.
        this.state.start('BootScene');

        // Handle debug mode.
        if (ccfg.showStats) {
            // this.setupStats();
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

window.game = new Game(ccfg.phaserConfig);

// window.onresize = function () {
//     game.renderer.resize(window.innerWidth, window.innerHeight, 1.0);
// }