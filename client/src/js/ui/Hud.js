/**
 * Handling the HUD of the game
 */

export default class Hud {
    constructor() {
        //delete this line
        this.nResources = 0;
        const margin = 10;
        this.nResourcesText = new Phaser.Text(window.game, margin, window.game.height - margin, 'Resource : 0', {
            fontSize: '32px',
            fill: '#FFFFFF'
        });
        this.nResourcesText.fixedToCamera = true;
        this.nResourcesText.anchor.setTo(0, 1);

        this.inventoryBar = new Phaser.Sprite(window.game, window.game.width / 2, window.game.height - margin, 'inventoryBar');
        this.inventoryBar.fixedToCamera = true;
        this.inventoryBar.anchor.setTo(0.5, 1);

        const inventoyBarScale = 0.4;
        this.inventoryBar.scale.setTo(inventoyBarScale);

        // window.game.hudGroup.add(this.nResourcesText);
        window.game.hudGroup.add(this.inventoryBar);
    }

    update(selfPlayer) {
        this.displayResources(selfPlayer);
    }

    displayResources(selfPlayer) {
        //delete this, not an HUD
        // this.nResources = selfPlayer.state.inventory.wood;
        this.nResourcesText.text = 'Resource ' + this.nResources;
    }
}