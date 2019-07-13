import { ClientEngine } from 'iogine';
import { TYPES } from '@fortitan/shared/config/world.csconfig';

export default class MyClientEngine extends ClientEngine {
  /**
   * Create the renderer of the client.
   * You can add events to eventHandlers here.
   *
   * @param  {GameEngine} gameEngine
   * cns
   */
  constructor(gameEngine) {
    super(gameEngine, TYPES);
  }
}
// this.renderer = gameEngine.renderer = new PhaserGame(this);
// window.game = this.renderer;

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
//     if (cfg.debug.fakeServer) {
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
