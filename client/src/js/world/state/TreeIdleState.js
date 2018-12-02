import State from 'iogine/world/State';


export default class TreeIdleState extends State {

    update() {
        if (this.state.hit) {
            this.entity.enterHitState();
        }
    }

}