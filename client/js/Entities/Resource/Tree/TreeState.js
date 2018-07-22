import Matter from 'matter-js';
import ResourceState from '../ResourceState';
import ccfg from '../../../config';



export default class TreeState extends ResourceState {

	constructor(entity, state, engine) {
		super(entity, state, engine);

		this.body = Matter.Bodies.circle(this.x,this.y-25,ccfg.tree.bodyRadius, ccfg.tree.bodyOptions);
		this.body2 = Matter.Bodies.rectangle(this.x,this.y+90,ccfg.tree.bodyWidth, ccfg.tree.bodyHeight, ccfg.tree.bodyOptions);
		this.body.entity = this.entity;
		this.body2.entity = this.entity;

        Matter.World.add(this.engine.world, [this.body, this.body2]);

        //Matter.World.add(this.engine.world, [Matter.Bodies.circle(this.x,this.y-25,ccfg.tree.bodyRadius, ccfg.tree.bodyOptions),Matter.Bodies.rectangle(this.x,this.y+90,ccfg.tree.bodyWidth, ccfg.tree.bodyHeight, ccfg.tree.bodyOptions)]);
	}

	init() {
        this.actionState = new PlayerActionIdleState(this);
    }
	
	update(delta) {

	}

}
