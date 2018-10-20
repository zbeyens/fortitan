import ResourceV from '../ResourceV';

export default class TreeV extends ResourceV {

	constructor(entity) {
		super(entity);

		this.time = 0;
	}

	update(delta) {
		super.update(delta);

		if (delta) {
			this.time += delta;
		}
    	// this.time = this.time % 1000;
    	if (this.time > 200) {
    		if (this.time > 1000) this.time = 0;
    		return;
    	}

    	const radius = 4;
		// let magnitude = this._duration / this._radius * this._radius;
		let shakeX = window.game.rnd.integerInRange(-radius, radius);
		let shakeY = window.game.rnd.integerInRange(-radius, radius);

    	this.sprite.x = this.entity.state.x + shakeX;
    	this.sprite.y = this.entity.state.y + shakeY;
    }
}
