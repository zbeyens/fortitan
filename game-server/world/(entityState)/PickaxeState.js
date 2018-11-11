import Matter from 'matter-js';
import EntityState from '../../../EntityState';
import BodyFactory from '../../../../../physics/BodyFactory';
import cfg from '../../../../../config';

export default class PickaxeState extends EntityState {

	constructor(entity, state, engine) {
		super(entity, state, engine);
		this.owner = state.owner;
		const bodyOptions = cfg.item.bodyOptions;
		bodyOptions.category = cfg.item.pickaxeCategory;
		this.body = BodyFactory.rectangle(this, cfg.item.bodyWidth, cfg.item.bodyHeight, bodyOptions);

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
