import Map from '../Map';
import Camera from '../Camera';
import PlayerManager from '../Entities/Player/PlayerManager';
import InputManager from '../InputManager';
import TreeManager from '../Entities/Resource/Tree/TreeManager';
import StoneManager from '../Entities/Resource/Stone/StoneManager';
import Physics from '../physics/Physics'
import ccfg from '../config/';
import Hud from '../Hud';

/**
 * Setup and display the main game state.
 */
class GameScene extends Phaser.State {

    create() {
        this.game.backgroundgroup = this.game.add.group();
        this.game.Itemgroup = this.game.add.group();
        this.game.Playersgroup = this.game.add.group();
        this.game.Resourcegroup = this.game.add.group();
        this.game.Hudgroup = this.game.add.group();
        
        this.game.world.setBounds(0, 0, 4000, 4000);

        this.map = new Map(this);
        this.camera = new Camera(this.game);
        this.hud = new Hud();

        this.physics = new Physics();
        const physics = this.physics;

        this.playerManager = new PlayerManager(this.game);
        this.playerManager.add({
            id: 0,
            state: {
                x: 300,
                y: 300,
            },
            props: {
                skin: 'test',
            },
            engine: physics.engine
        });
        this.treeManager = new TreeManager(this.game);
        this.treeManager.add({
            id: 1,
            state: {
                x: 500,
                y: 500,
            },
            props: {
                skin: 'tree2'
            },
            engine: physics.engine
        });
        this.stoneManager = new StoneManager(this.game);
        this.stoneManager.add({
            id: 2,
            state: {
                x: 700,
                y: 700,
            },
            props: {
                skin: 'stone',
            },
            engine: physics.engine

        });

        const selfPlayer = this.playerManager.entities[0];
        this.camera.follow(selfPlayer);

        this.inputManager = new InputManager(this.game);
    }

    /**
     * Update loop
     * @param  {float} time  from the beginning of the scene
     * @param  {float} delta time between 2 updates
     */
    update(game) {
        const delta = game.time.elapsed
        const selfPlayer = this.playerManager.entities[0];

        this.inputManager.handleGame(selfPlayer);

        this.physics.update(selfPlayer);
        
        // console.log(delta);
        this.playerManager.update(delta);
        this.treeManager.update(delta);
        this.stoneManager.update(delta);

        this.game.debug.cameraInfo(this.game.camera, 32, 32);
        this.hud.update(selfPlayer);
        // this.game.debug.camera(this.game.camera);
        // this.game.debug.inputInfo(32, 600);
        // this.game.debug.scale(32, 600);
        
    
    
    }
}

export default GameScene;