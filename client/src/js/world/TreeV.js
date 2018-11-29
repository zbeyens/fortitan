import ResourceV from './ResourceV';

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

        const shakeDuration = 200;
        const shakeInterval = 1000;
        if (this.time > shakeDuration) {
            if (this.time > shakeInterval) this.time = 0;
            return;
        }

        const radius = 4;
        // let magnitude = this._duration / this._radius * this._radius;
        const shakeX = this.game.rnd.integerInRange(-radius, radius);
        const shakeY = this.game.rnd.integerInRange(-radius, radius);

        this.sprite.x = this.entity.state.x + shakeX;
        this.sprite.y = this.entity.state.y + shakeY;
    }
}