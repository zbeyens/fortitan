/**
 * Setup the pre-game boot sequence.
 * Scene loading all the assets: image, atlas, sounds,...
 */
class BootScene extends Phaser.State {

    /**
   * Setup variables or objects before the preloading starts.
   */
    init() {
        // Phaser will automatically pause if the browser tab the game
        // is in loses focus. You can disable that here:
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