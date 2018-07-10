import Ground from './Entities/Ground/Ground';
import ccfg from './config'


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
        const width = tilesWidth * ccfg.tileSize;
        const height = tilesHeight * ccfg.tileSize;

		const ground = new Ground({
            id: 2,
            state: {
                x: tilesX * ccfg.tileSize + width / 2,
                y: tilesY * ccfg.tileSize + height / 2,
            },
            props: {
            	width,
            	height,
            	category: ccfg.ground.category,
                skin: 'ground', //TODO
            },
            engine: state.physics.engine
        });

        // const 
    }

}