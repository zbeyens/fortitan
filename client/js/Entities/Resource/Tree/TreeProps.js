import ResourceProps from '../ResourceProps';
import ccfg from '../../../config';


export default class TreeProps extends ResourceProps {
	constructor(props) {
		super();
		this.skin = props.skin;
		this.category = ccfg.treeCategory;	
	}
}
