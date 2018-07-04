import EntityProps from '../EntityProps';
import ccfg from '../../config/';

/**
 * Contains the skin,...
 */
export default class PlayerProps extends EntityProps {
	constructor(props) {
		super();
		this.skin = props.skin;
		this.category = ccfg.player.category;
	}
}