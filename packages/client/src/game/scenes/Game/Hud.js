import PhaserView from 'iogine/render/phaser/PhaserView';
import { HUD, STYLES } from 'config/hud.config';
import { IMAGES } from 'config/preload.config';

/**
 * Handling the HUD of the game
 *
 * TODO: on resize, update positions
 * Update HUD values
 */
export default class Hud extends PhaserView {
  constructor(game) {
    super();

    this.scene = window.scene;

    const margin = 10;
    this.nResourcesText = game.add.text(
      margin,
      game.height - margin,
      HUD.nResources.text,
      STYLES.numbers
    );
    this.nResourcesText.fixedToCamera = true;
    this.nResourcesText.anchor.setTo(0, 1);

    this.inventoryBar = game.add.sprite(
      game.width / 2,
      game.height - margin,
      IMAGES.inventoryBar[0]
    );
    this.inventoryBar.fixedToCamera = true;
    this.inventoryBar.anchor.setTo(0.5, 1);
    this.inventoryBar.scale.setTo(HUD.inventoryBar.scale);

    game.hudGroup.add(this.nResourcesText);
    game.hudGroup.add(this.inventoryBar);
  }

  update(dt) {
    const { selfPlayer } = this.scene.gameEngine;
    if (!selfPlayer) return;

    this.displayResources(selfPlayer);
  }

  displayResources(selfPlayer) {
    // delete this, not an HUD
    // this.nResources = selfPlayer.state.inventory.wood;
    // this.nResourcesText.text = 'Resource ' + this.nResources;
  }
}
