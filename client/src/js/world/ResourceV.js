import EntityV from './EntityV';

export default class ResourceV extends EntityV {

    constructor(entity) {
        super(entity);

        this.addSprite();
        this.game.resourceGroup.add(this.sprite);
    }

    update(delta) {
        super.update(delta);
    }

}