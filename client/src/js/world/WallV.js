import EntityV from './EntityV';
import cfg from '../../config';


export default class WallV extends EntityV {

    constructor(entity) {
        super(entity);
        this.entity = entity;

        // TODO: only once!
        const bmd = this.game.make.bitmapData(cfg.building.thickness, cfg.building.length);
        bmd.rect(0, 0, cfg.building.thickness, cfg.building.length, 'rgba(166, 124, 82,0.8)');

        this.sprite = this.game.add.sprite(0, 0, bmd);
        this.centerAnchor(this.sprite);
        this.game.buildingGroup.add(this.sprite);
        if (this.entity.props.preview) this.sprite.alpha = 0.5;
    }

    update(delta) {
        // super.update(delta);

        const x = this.entity.state.x;
        const y = this.entity.state.y;
        this.sprite.position.setTo(x, y);
        // this.game.debug.geom(this.sprite,'#A67C52');


    }
}