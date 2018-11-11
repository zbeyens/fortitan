import Map from './Map';
import Hud from './Hud';


export default class GameAssets {

    constructor(game) {
        this.game = game;
        this.map = new Map(this.game);
        this.hud = new Hud(this.game);
    }

    update(dt) {
        this.map.update(dt);
        this.hud.update(dt);
    }
}