import EntityView from '../../../EntityView';

export default class PickaxeView extends EntityView {

    constructor(entity) {
        super(entity);
        
        this.game.itemGroup.add(this);
    }

    update(delta) {
        super.update(delta);
        if (this.entity.state.owner.state.dirLeft) {
            this.scale.x = 1;
        } else {
            this.scale.x = -1;
        }
    }
}