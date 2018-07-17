import ResourceView from '../ResourceView';

export default class TreeView extends ResourceView {

	constructor(entity){
		super(entity);
		this.game.resourceGroup.add(this);
	}

    update(delta) {
    	super.update(delta);
    }
}
