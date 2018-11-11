import State from './State';
// import cfg from '../../../config';


export default class PlayerMoveState extends State {

	handleInput(input) {
		this.state.direction = {
            x: 0,
            y: 0
        };

        if (input.left) {
            this.state.direction.x = -1;
        }
        if (input.right) {
            this.state.direction.x = 1;
        }
	}

	/**
     * Update the position of the state from the physics position
     * Move the player in X
     */
	update(dt) {
        this.state.position = this.physics.body.position;

        this.physics.move();

        const pos = this.state.position;
        // angle from the camera center to the mouse
        this.state.targetAngle = Math.atan2(window.game.camera.y + window.game.input.mousePointer.y - pos.y, window.game.camera.x + window.game.input.mousePointer.x - pos.x);

        this.state.angle = this.state.targetAngle * 180 / Math.PI;
        // Matter.Body.setAngle(this.body, this.targetAngle);
	}

}