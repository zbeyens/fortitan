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
		
		const tilesX = 8;
        const tilesY = 1;

		const ground = new Ground({
            id: 2,
            state: {
                x: 350,
                y: 860,
            },
            props: {
            	tilesX,
            	tilesY,
            	width: tilesX * ccfg.tileSize,
            	height: tilesY * ccfg.tileSize,
            	category: ccfg.ground.category,
                skin: 'ground', //TODO
            },
            engine: state.physics.engine
        })
    }

}