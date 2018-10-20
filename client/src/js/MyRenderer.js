import Renderer from './Renderer';

/**
 * Renderer for the client - based on Phaser
 */
export default class MyRenderer extends Renderer {

	constructor(gameEngine, clientEngine) {
        super(gameEngine, clientEngine);

        this.sprites = {};

        for (let objId of Object.keys(this.sprites)) {
            let objData = this.gameEngine.world.entities[objId];
            let sprite = this.sprites[objId];

            if (objData) {

            	sprite.update(objData);

            }
        }
    }

}