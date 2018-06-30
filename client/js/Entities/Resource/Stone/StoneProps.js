import ResourceProps from '../ResourceProps';
import ccfg from '../../../config';

export default class StoneProps extends ResourceProps {
	constructor(props) {
		super();
		this.skin = props.skin;
		this.radius = props.radius;
		this.category = ccfg.stoneCategory;
		this.mask = props.mask;
	}
}
