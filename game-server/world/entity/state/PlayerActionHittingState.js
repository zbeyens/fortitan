import State from './State'
import cfg from '../../../config'


export default class PlayerActionHittingState extends State {

    enter() {
        this.state.hitting = true;
        this.timeElapsed = 0;

        this.hits = [];
    }

    update(delta) {
        this.timeElapsed += delta;

        //this.checkHitCollisions();

        if (this.timeElapsed > cfg.players.hittingCd) {
            this.entity.enterActionIdleState();
        }
    }

}