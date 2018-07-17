import ccfg from '../../../config';


export default class WallView {

	constructor(entity) {
		// super(entity);
		this.entity = entity;

        this.wall = new Phaser.Rectangle(0, 550, 800, 50);                                      
    	// window.game.platformGroup.add(this.wall);
	}

    update(delta) {
    	// super.update(delta);

    	const width = ccfg.building.thickness;
        const height = ccfg.tileSize;
        const x = this.entity.state.x - width / 2;
		const y = this.entity.state.y - height / 2
        this.wall.setTo(x, y, width, height);
        window.game.debug.geom(this.wall,'#A67C52');
    }
}


