import EntityV from './EntityV';
// import cfg from '../../config';


export default class GroundV extends EntityV {

    constructor(entity) {
        super(entity);

        this.spriteBody = window.game.add.tileSprite(this.state.position.x, this.state.position.y, this.props.body.width, this.props.body.height, 'ground');
        this.spriteBody.anchor.setTo(0.5);
        window.game.platformGroup.add(this.spriteBody);
    }

}