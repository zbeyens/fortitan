import Renderer from './Renderer';

/**
 * Renderer for the client - based on Phaser
 */
export default class MyRenderer extends Renderer {

	constructor(gameEngine, clientEngine) {
        super(gameEngine, clientEngine);

        this.sprites = {};

        for (const objId of Object.keys(this.sprites)) {
            const objData = this.gameEngine.world.entities[objId];
            const sprite = this.sprites[objId];

            if (objData) {

            	sprite.update(objData);

            }
        }
    }

}