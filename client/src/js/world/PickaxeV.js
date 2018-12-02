import PhaserView from 'iogine/render/phaser/PhaserView';
import cfg from '../config';


export default class PickaxeV extends PhaserView {

    constructor(id, initState, initProps) {
		super(id, initState, initProps);

		const pos = this.state.position;
		const key = cfg.images.pickaxes[0];
		this.spriteMain = this.game.add.sprite(pos.x, pos.y, key);
		this.game.itemGroup.add(this.spriteMain);
		this.addCenter(this.spriteMain);

		this.initState();
    }
    
    initState() {
        this.state.dirX = 1;
    }

    update(dt) {
        // super.updatePositions(dt);
        
        const ownerState = this.state.owner.state;
        
        if (ownerState.direction.x === 1) {
            this.state.dirX = 1;
        } else if (ownerState.direction.x === -1) {
            this.state.dirX = -1;
        }
        this.spriteMain.scale.x = -this.state.dirX;
        
        const offset = {
            x: 50,
            y: -10,
        };
        this.spriteMain.position = {
            x: ownerState.position.x + this.state.dirX * offset.x,
            y: ownerState.position.y + offset.y,
        };
    }
}

