import Matter from 'matter-js';
import EntityState from '../../EntityState'
import BodyFactory from '../../../../physics/BodyFactory'
import cfg from '../../../../config';


export default class WallState extends EntityState {

    constructor(entity, state, engine) {
        super(entity, state, engine);

        this.owner = state.owner;

        if (this.entity.props.preview) return;

        this.body = BodyFactory.rectangle(this, cfg.building.thickness, cfg.building.length, cfg.building.bodyOptions);
        Matter.World.add(this.engine.world, this.body);
    }

    update(delta) {
        let dirX;

        if (Math.abs(this.owner.state.angle) <= 90) {
            dirX = 1;
        } else {
            dirX = -1;
        }

        const xReal = this.owner.state.x - cfg.building.offsetX + dirX * cfg.building.length / 2;
        const yReal = this.owner.state.y - cfg.building.offsetY;
        this.x = cfg.building.offsetX + Math.round(xReal / cfg.building.length) * cfg.building.length;
        this.y = cfg.building.offsetY + Math.round(yReal / cfg.building.length) * cfg.building.length;

        if (this.entity.props.preview) return;

        Matter.Body.setPosition(this.body, {
            x: this.x,
            y: this.y,
        });
    }

}