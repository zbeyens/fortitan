/**
 * Handling the HUD of the game
 */
import PreloaderScene from './scenes/PreloaderScene';
import GameScene from './scenes/GameScene';

export default class Hud {
    constructor() {
        //delete this line
        this.nResources = 0;
        this.nResourcesText = new Phaser.Text(window.game, 10, window.game.height - 10, 'Resource : 0', {
            fontSize: '32px',
            fill: '#FFFFFF'
        });
        this.nResourcesText.fixedToCamera = true;
        this.nResourcesText.anchor.setTo(0, 1);
        
        this.inventoryBar = new Phaser.Sprite(window.game, window.game.width / 2, window.game.height - 10, 'inventoryBar');
        this.inventoryBar.fixedToCamera = true;
        this.inventoryBar.anchor.setTo(0.5, 1);

        this.inventoryBar.scale.setTo(0.4);

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