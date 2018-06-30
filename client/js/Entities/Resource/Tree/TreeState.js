import ResourceState from '../ResourceState';
import ccfg from '../../../config';


export default class TreeState extends ResourceState {

	constructor(entity, state, engine) {
		super(entity, state, engine);

		this.createCircleBody(ccfg.treeBodyRadius, true);
	}
	update(delta) {

	}

}
