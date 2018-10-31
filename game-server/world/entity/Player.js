import Entity from './Entity';
import PlayerPhysics from './physics/PlayerPhysics';
// import Wall from '../building/wall/Wall';
// import Pickaxe from '../item/weapon/pickaxe/Pickaxe';
// import cfg from '../../config';
import PlayerActionIdleState from './state/PlayerActionIdleState';
import PlayerActionHittingState from './state/PlayerActionHittingState';
import PlayerMoveStandingState from './state/PlayerMoveStandingState';
import PlayerMoveJumpingState from './state/PlayerMoveJumpingState';


export default class Player extends Entity {
    constructor({ id, state, props, engine }) {
        super(id);
        this.props = props;
        this.state = state;

        this.physics = new PlayerPhysics(this, engine);

        this.initState();
    }

    initState() {
        this.enterStandingState();
        this.enterActionIdleState();
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

    enterActionIdleState() {
        this.actionState = new PlayerActionIdleState(this);
    }

    enterActionHittingState() {
        this.actionState = new PlayerActionHittingState(this);
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