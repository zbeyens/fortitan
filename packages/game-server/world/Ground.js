import StaticEntity from 'iogine/world/StaticEntity';
import GroundPhysics from './physics/GroundPhysics';


export default class Ground extends StaticEntity {

    constructor(id, initState, initProps, gameEngine) {
		super(id, initState, initProps, gameEngine);
        
        this.physics = new GroundPhysics(this, gameEngine.physicsEngine);
    }
  
}