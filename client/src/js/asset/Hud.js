import PhaserView from 'iogine/render/phaser/PhaserView';
import cfg from '../config';

/**
 * Handling the HUD of the game
 *
 * TODO: on resize, update positions 
 * Update HUD values
 */
export default class Hud extends PhaserView {

    constructor(game) {
        super();

        this.game = game;

        const margin = 10;
        this.nResourcesText = game.add.text(margin, game.height - margin, cfg.hud.nResources.text, cfg.styles.numbers);
        this.nResourcesText.fixedToCamera = true;
        this.nResourcesText.anchor.setTo(0, 1);

        this.inventoryBar = game.add.sprite(game.width / 2, game.height - margin, cfg.images.inventoryBar[0]);
        this.inventoryBar.fixedToCamera = true;
        this.inventoryBar.anchor.setTo(0.5, 1);
        this.inventoryBar.scale.setTo(cfg.hud.inventoryBar.scale);

        game.hudGroup.add(this.nResourcesText);
        game.hudGroup.add(this.inventoryBar);
    }

    update(dt) {
        const selfPlayer = this.game.gameEngine.selfPlayer;
        if (!selfPlayer) return;

        this.displayResources(selfPlayer);
    }

    displayResources(selfPlayer) {
        //delete this, not an HUD
        // this.nResources = selfPlayer.state.inventory.wood;
        // this.nResourcesText.text = 'Resource ' + this.nResources;
    }
}