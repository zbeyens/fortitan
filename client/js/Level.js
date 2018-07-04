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
		
		const ground = new Ground({
            id: 2,
            state: {
                x: 0,
                y: 800,
            },
            props: {
            	width: ccfg.ground.width,
            	height: ccfg.ground.height,
            	category: ccfg.ground.category,
                skin: 'stone', //TODO
            },
            engine: state.physics.engine
        })
    }

}