import Entity from './Entity';
import GroundPhysics from './physics/GroundPhysics';


export default class Ground extends Entity {

    constructor({ id, state, props, engine }) {
        super(id);
		this.props = props;
        this.state = state;
        
        this.physics = new GroundPhysics(this, engine);
    }
  
}