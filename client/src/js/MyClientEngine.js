import EventEmitter from 'eventemitter3';
import ClientEngine from 'iogine/ClientEngine';
import PhaserGame from './PhaserGame';
import FakeServerEngine from '../../../game-server/FakeServerEngine';
import cfg from './config';


export default class MyClientEngine extends ClientEngine {

    constructor(gameEngine) {
        super(gameEngine);

        if (cfg.debug.standaloneMode) {
            this.serverEngine = new FakeServerEngine(); 
        }

        // create the renderer
        this.renderer = gameEngine.renderer = new PhaserGame(this);
        window.game = this.renderer;
    }

    start() {
        if (cfg.debug.standaloneMode) {
            // start the fake server
            this.serverEngine.start();

            // create a fake socket and client connection
            this.socket = new EventEmitter();
            this.socket.id = 0;
            super.start();

            // server receive connection
            this.serverEngine.onPlayerConnected(this.socket);
        }
    }

    connect() {
        super.connect();
    }

    step(t, dt) {
        if (cfg.debug.standaloneMode) {
            this.serverEngine.step(dt);
        }

        super.step(t, dt);
    }

    handleInboundMessage(data) {
        const type = 'players';

        this.updateEntities(type, data);
    }

    /**
     * Update all the entities of a type from the world update
     * @param  {[type]} type [description]
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
    updateEntities(type, data) {
        const entitiesServer = data[type];
        for (const id of Object.keys(entitiesServer)) {
            const entityServer = entitiesServer[id];

            const entitiesView = this.gameEngine.world.entities[type];
            if (!entitiesView[id]) {
                const newEntity = this.gameEngine.addEntity(type, entityServer);
                
                // if it is a player with selfId, we know selfPlayer 
                if (type === 'players' && Number(id) === this.gameEngine.selfId) {
                    console.log("Self player update received");
                    this.gameEngine.selfPlayer = newEntity;
                }
            } else {
                this.gameEngine.updateEntity(type, entityServer);
            }
        }
    }
}

// connect() {
//     super.connect();

//     // this.socket.on('scoreUpdate', (e) => {
//     //     this.renderer.updateScore(e);
//     // });

//     // this.socket.on('disconnect', (e) => {
//     //     console.log('disconnected');
//     //     document.body.classList.add('disconnected');
//     //     document.body.classList.remove('gameActive');
//     //     document.querySelector('#reconnect').disabled = false;
//     // });

//     // if ('autostart' in Utils.getUrlVars()) {
//     //     this.socket.emit('requestRestart');
//     // }
// }
// 
// start() {
//     if (cfg.debug.standaloneMode) {
//         // start the fake server
//         this.serverEngine.start();

//         // create a fake socket and client connection
//         this.socket = new EventEmitter();
//         this.socket.id = 0;
//         super.start();

//         // server receive connection
//         this.serverEngine.onPlayerConnected(this.socket);
//     }

//     // handle gui for game condition
//     // this.gameEngine.on('objectDestroyed', (obj) => {
//         // if (obj instanceof Ship && this.gameEngine.isOwnedByPlayer(obj)) {
//         //     document.body.classList.add('lostGame');
//         //     document.querySelector('#tryAgain').disabled = false;
//         // }
//     // });

//     // click event for "try again" button
//     // document.querySelector('#tryAgain').addEventListener('click', () => {
//     //     this.socket.emit('requestRestart');
//     // });

//     // document.querySelector('#joinGame').addEventListener('click', (clickEvent) => {
//     //     clickEvent.currentTarget.disabled = true;
//     //     this.socket.emit('requestRestart');
//     // });

//     // document.querySelector('#reconnect').addEventListener('click', () => {
//     //     window.location.reload();
//     // });

//     // this.networkMonitor.on('RTTUpdate', (e) => {
//     //     this.renderer.updateHUD(e);
//     // });
// }