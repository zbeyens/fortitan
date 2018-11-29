/**
 * Handling the Camera position
 */
export default class Camera {

    constructor(game) {
        this.game = game;
    }

    update() {
        const playerToFollow = this.game.gameEngine.selfPlayer;
        if (!playerToFollow || this.game.camera.target) return;

        //  Notice that the sprite doesn't have any momentum at all,
        //  it's all just set by the camera follow type.
        //  0.1 is the amount of linear interpolation to use.
        //  The smaller the value, the smooth the camera (and the longer it takes to catch up)
        const lerp = 0.1;
        this.game.camera.follow(playerToFollow.spriteMain, Phaser.Camera.FOLLOW_LOCKON, lerp, lerp);
        console.log("Camera following");
    }

}