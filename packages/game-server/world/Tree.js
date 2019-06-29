import DynamicEntity from 'iogine/world/DynamicEntity';
import TreePhysics from './physics/TreePhysics';


export default class Tree extends DynamicEntity {

    constructor(id, initState, initProps, gameEngine) {
		super(id, initState, initProps, gameEngine);
        
        this.physics = new TreePhysics(this, gameEngine.physicsEngine);
    }
  
}
