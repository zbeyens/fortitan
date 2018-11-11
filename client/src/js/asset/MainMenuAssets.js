import PhaserView from 'iogine/render/phaser/PhaserView';
import cfg from '../config';


export default class MainMenuAssets extends PhaserView {

    constructor(game) {
        super();

        this.game = game;

        this.bg = game.add.sprite(0, 0, cfg.images.mainMenuBg[0]);
        this.centerAnchor(this.bg);

        const height = 100;
        this.title = game.add.sprite(this.game.config.width / 2, height, cfg.images.mainMenuTitle[0]);
        this.centerAnchor(this.title);
    }

    update(dt) {
        if (this.game.width / this.game.height > cfg.aspectRatio) {
            this.bg.width = this.game.width;
            this.bg.height = this.game.width / cfg.aspectRatio;
        } else {
            this.bg.width = this.game.height * cfg.aspectRatio;
            this.bg.height = this.game.height;
        }

        this.bg.position = {
            x: this.game.width / 2,
            y: this.game.height / 2,
        };

        this.title.position.x = this.game.width / 2;
    }

}