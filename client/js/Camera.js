
/**
 * Handling the Camera position
 */
export default class Camera {
	follow(player) {
		//  Notice that the sprite doesn't have any momentum at all,
        //  it's all just set by the camera follow type.
        //  0.1 is the amount of linear interpolation to use.
        //  The smaller the value, the smooth the camera (and the longer it takes to catch up)
        window.game.camera.follow(player.view, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
	}
}
