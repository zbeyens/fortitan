import EventEmitter from 'eventemitter3'
import ServerEngine from './ServerEngine'
import MyGameEngineServer from './MyGameEngineServer'


export default class FakeServerEngine extends ServerEngine {

    constructor() {
    	const gameEngine = new MyGameEngineServer();

        super(null, gameEngine);
    }

    start() {
        super.start();
    }

    step(dt) {
        this.serverTime = (new Date().getTime());
        // for each player, replay all the inputs in the oldest step
        for (let playerIdStr of Object.keys(this.playerInputQueues)) {
            let playerId = Number(playerIdStr);
            let inputQueue = this.playerInputQueues[playerId];

            inputQueue.forEach(input => {
                this.gameEngine.processInput(input, playerId);
            });
            inputQueue = [];
        }

        // run the game engine step
        this.gameEngine.step(0, dt);

        // update clients only at the specified step interval, as defined in options
        for (let socketId of Object.keys(this.connectedPlayers)) {
            let player = this.connectedPlayers[socketId];
            if (player.state === 'new') {
                player.state = 'synced';
            }
        }

        let payload = this.serializeUpdate();
        // console.log(`========== sending world update ${this.gameEngine.world.stepCount} is delta update ==========`);

        for (let socketId of Object.keys(this.connectedPlayers))
            this.connectedPlayers[socketId].socket.emit('worldUpdate', payload);
    }

    serializeUpdate() {
        return this.gameEngine.world.entities;
    }

    onPlayerConnected(socket) {
        // save player
        this.connectedPlayers[socket.id] = {
            socket: socket,
            state: 'new'
        };

        // socket id, no need to send it at the moment
        let socketId = socket.playerId = ++this.socketCount;

        // TODO: add the player when the client clicks on Play button 
        let player = this.gameEngine.makePlayer();
        player.socketId = socketId;

        let playerEvent = {
            playerId: player.id,
        };
        // this.gameEngine.emit('server__playerJoined', playerEvent);
        // this.gameEngine.emit('playerJoined', playerEvent);
        socket.emit('playerJoined', playerEvent);

        socket.on('move', (data) => {
            this.onReceivedInput(data, socket);
        });

        // handle client restart requests
        // socket.on('requestRestart', addPlayer);
    }

    queueInputForPlayer(data, playerId) {
        // create an input queue for this player, if one doesn't already exist
        if (!this.playerInputQueues.hasOwnProperty(playerId))
            this.playerInputQueues[playerId] = [];
        let queue = this.playerInputQueues[playerId];

        // add the input to the player's queue
        queue.push(data);
    }

    onReceivedInput(data, socket) {
        this.queueInputForPlayer(data, socket.playerId);
    }
}