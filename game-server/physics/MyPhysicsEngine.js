import Matter from 'matter-js';
import MatterPhysicsEngine from './MatterPhysicsEngine.js'
import MyCollisionHandler from './MatterPhysics/MyCollisionHandler'
import BodyFactory from './BodyFactory';
import cfgs from '../../shared/config/'
import cfg from '../config/'


export default class MyPhysicsEngine extends MatterPhysicsEngine {

	constructor(gameEngine) {
		super(gameEngine);

		this.collisionHandler = new MyCollisionHandler(this);

		const tilesX = 0;
		const tilesY = 6;
		const tilesWidth = 8;
		const tilesHeight = 1;
		const width = tilesWidth * cfgs.tileSize;
		const height = tilesHeight * cfgs.tileSize;

		const position = {
			x: tilesX * cfgs.tileSize + width / 2,
			y: tilesY * cfgs.tileSize + height / 2
		}

		const entity = { 
			state: {
				position
			},
			props: cfg.grounds.props
		};

		this.body = BodyFactory.rectangle(entity, width, height, cfg.grounds.bodyOptions);
		Matter.World.add(this.world, this.body);
        // const ground = Matter.Bodies.rectangle(0, 500, 5000, 200, cfg.ground.bodyOptions);
        // Matter.World.add(this.world, [ground]);
    }

    step(t, dt) {
    	// if dt is too high, don't process the step to not break the game
    	if (dt > 100) return;

    	super.step(t, dt);
    }

}