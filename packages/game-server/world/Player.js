import DynamicEntity from "iogine/world/DynamicEntity";
import PlayerPhysics from "./physics/PlayerPhysics";
// import Wall from '../building/wall/Wall';
// import Pickaxe from '../item/weapon/pickaxe/Pickaxe';
// import cfg from '../../config';
import PlayerUseIdleState from "./state/PlayerUseIdleState";
import PlayerUseState from "./state/PlayerUseState";
import PlayerMoveStandingState from "./state/PlayerMoveStandingState";
import PlayerMoveJumpingState from "./state/PlayerMoveJumpingState";
import Inventory from "./Inventory";

export default class Player extends DynamicEntity {
  constructor(id, initState, initProps, gameEngine) {
    super(id, initState, initProps, gameEngine);

    this.physics = new PlayerPhysics(this, gameEngine.physicsEngine);

    this.inventory = new Inventory(this);
    this.gameEngine.createPickaxe(this);
    console.log("this.inventory.items", this.inventory.items);

    this.initState();
  }

  initState() {
    this.enterStandingState();
    this.enterUseIdleState();
  }

  handleInput(input) {
    this.moveState.handleInput(input);
    this.actionState.handleInput(input);
  }

  update(dt) {
    this.moveState.update(dt);
    this.actionState.update(dt);
  }

  enterStandingState() {
    this.moveState = new PlayerMoveStandingState(this);
  }

  enterJumpingState() {
    this.moveState = new PlayerMoveJumpingState(this);
  }

  enterUseIdleState() {
    this.actionState = new PlayerUseIdleState(this);
  }

  enterUseState() {
    this.actionState = new PlayerUseState(this);
  }
}

// const self = this;
// this.buildingPreview = new Wall({
//  id: 0,
//  props: {
//         preview: true
//     },
//  state: {
//      x: self.state.x,
//      y: self.state.y,
//      owner: self,
//  },
//  engine: engine
// });

// this.items = [];
// this.items.push(new Pickaxe({
//     id: 0,
//     state: {
//         x: this.state.x,
//         y: this.state.y,
//         owner: self
//     },
//     props: {
//         texture: 'pickaxe'
//     },
//     engine: engine
// }));

// update(dt) {
//         super.update(dt);
// for (let i = this.items.length - 1; i >= 0; i--) {
//        const entity = this.items[i];
//        entity.update(dt);
//    }

//    this.buildingPreview.update(dt);
// }
