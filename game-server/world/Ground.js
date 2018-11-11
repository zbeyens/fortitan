import StaticEntity from 'iogine/world/StaticEntity';
import GroundPhysics from './physics/GroundPhysics';


export default class Ground extends StaticEntity {

    constructor({ id, state, props, engine }) {
        super(id);
		this.props = props;
        this.state = state;
        
        this.physics = new GroundPhysics(this, engine);
    }
  
}