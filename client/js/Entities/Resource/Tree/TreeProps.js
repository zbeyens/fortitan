import ResourceProps from '../ResourceProps';
import ccfg from '../../../config';


export default class TreeProps extends ResourceProps {
	constructor(props) {
		super();
		this.skin = props.skin;
		this.radius = ccfg.treeBodyRadius;
		this.category = ccfg.treeCategory;	
		this.mask = ccfg.treeMask;
	}
}
