/**
 * Setup the pre-game boot sequence.
 */
export default class BootScene extends Phaser.State {

    /**
     * Setup variables or objects before the preloading starts.
     */
    init() {
        // useful, as it will make the game keep reacting to messages from the server even when the game window doesn’t have focus
        this.stage.disableVisibilityChange = true;
    }

    /**
     * Preload any assets needed for the preload state.
     */
    preload() {
        //load preload bar
    }

    /**
     * Setup anything that is needed before the preload state begins.
     */
    create() {
        console.log("Phaser booted...");

        this.resizeGame();
        window.onresize = () => {
            this.resizeGame();
        };

        this.state.start('PreloaderScene');

    }


    resizeGame() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        this.scale.setGameSize(width, height);

        //like agario
        // const w = window.innerWidth * 1.25;
        // const h = window.innerHeight * 1.25;
        // console.log('Ratio: ' + w/h);

        // this.game.width = w;
        // this.game.height = h;
        // this.state.stage.bounds.width = w;
        // this.state.stage.bounds.height = h;
        // const pw = window.innerWidth / 2;
        // const ph = window.innerHeight / 2;
        // this.stage.pivot.set(pw, ph);
        // this.stage.position.set(pw, ph);

        // 1600 / 1920 = 0.8333;
        // 500 / 1080 = 0.463;
        // to fill canvas will be 0.8333 * (1920,1080) = (1600,900) clipped top and bottom
        // const scale = Math.max(w / cfg.scopeInitX, h / cfg.scopeInitY);

        // //care of rounding...
        // const canW = tool.round(2, scale * cfg.scopeInitX);
        // const canH = tool.round(2, scale * cfg.scopeInitY);
        // if (canW > w) {
        //     this.scale = window.innerHeight / cfg.scopeInitY;
        // } else
        // if (canH > h) {
        //     this.scale = window.innerWidth / cfg.scopeInitX;
        // }
        // //no smoothing
        // this.setScaleTarget(false);

        // this.scaleY = window.innerHeight / cfg.scaleHeight; //800
    }

}