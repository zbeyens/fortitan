/**
 * Setup the pre-game boot sequence.
 */
class BootScene extends Phaser.State {

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
        console.log("BOOTED");
        this.state.start('PreloaderScene');
    }
}

export default BootScene;