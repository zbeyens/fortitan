import StaticEntity from 'iogine/world/StaticEntity';
import GroundPhysics from './physics/GroundPhysics';


export default class Ground extends StaticEntity {

    constructor(id, initState, initProps, physicsEngine) {
        super(id, initState, initProps);
        
        this.physics = new GroundPhysics(this, physicsEngine);
    }
  
}