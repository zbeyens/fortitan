import Matter from 'matter-js';
import State from './State';
import ccfg from '../../../config/cConfig.global';


export default class PlayerActionHittingState extends State {
    constructor(state) {
        super(state);
        this.state.hitting = true;
        this.timeElapsed = 0;

        this.hits = [];

        this.renderOnce();
    }


    update(delta) {
        this.timeElapsed += delta;

        //this.checkHitCollisions();

        if (this.timeElapsed > ccfg.player.hittingCd) {
            this.state.actionState = this.state.getActionIdleState(this.state);
        }
    }

    

    // TODO
    handleHit(entity) {

    }

    renderOnce() {
        const view = this.state.entity.view;
        view.alpha = 0.5;
    }

}