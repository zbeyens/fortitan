import Matter from 'matter-js';
import ccfg from '../../../../config/';
import EntityState from '../../../EntityState';

export default class PickaxeState extends EntityState {

	constructor(entity, state, engine) {
		super(entity, state, engine);
		console.log(this.owner);
		this.owner = state.owner;
		const bodyOptions = ccfg.item.bodyOptions;
		bodyOptions.category = ccfg.item.pickaxeCategory;
		this.body = this.rectangle(ccfg.item.bodyWidth, ccfg.item.bodyHeight, bodyOptions);
		this.body.entity = this.entity;
		//this.body = this.rectangle(entity.props.width, entity.props.height, ccfg.ground.bodyOptions);
		Matter.Body.rotate(this.body, 90);
        Matter.World.add(this.engine.world, this.body);
	}
	update(delta) {
		let xOffset;
		if (this.entity.state.owner.state.dirLeft) {
           xOffset = -50;
        } else {
           xOffset = 50;
        }
		this.x = this.owner.state.x + xOffset;
		//console.log(this.x);
		this.y = this.owner.state.y;

		Matter.Body.setPosition(this.body,{
			x: this.x,
			y: this.y,
		});

		//console.log(this.body);
	}
}
