import Ground from '../entity/Ground/Ground'
import cfg from '../../config'


export default class Level {

    constructor(state) {
    	this.grounds = [];
    	this.bodies = []; //non static bodies
		this.map = []; //all static bodies
		// let cons = []; //all constaints between a point and a body
		// let consBB = []; //all constaints between two bodies
		// 
		
		const tilesX = 0;
        const tilesY = 6;
        const tilesWidth = 8;
        const tilesHeight = 1;
        const width = tilesWidth * cfg.tileSize;
        const height = tilesHeight * cfg.tileSize;

		const ground = new Ground({
            id: 2,
            state: {
                x: tilesX * cfg.tileSize + width / 2,
                y: tilesY * cfg.tileSize + height / 2,
            },
            props: {
            	width,
            	height,
            	category: cfg.ground.category,
                texture: 'ground', //TODO
            },
            engine: state.engine.engine
        });

        // const 
    }

}