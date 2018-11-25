import cfg from '../config';


export default class PhaserDebug {

    constructor(game) {
        this.game = game;
    }

    update() {
        const debugX = 32;
        const debugY = 600;
        if (cfg.debug.cameraInfo) {
            this.game.debug.cameraInfo(this.game.camera, debugX, debugX);
        }
        if (cfg.debug.camera) {
            this.game.debug.camera(this.game.camera);
        }
        if (cfg.debug.inputInfo) {
            this.game.debug.inputInfo(debugX, debugY);
        }
        if (cfg.debug.scale) {
            this.game.debug.scale(debugX, debugY);
        }
    }
}