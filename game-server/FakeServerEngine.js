// import EventEmitter from 'eventemitter3';
import ServerEngine from './ServerEngine';
import MyGameEngineS from './MyGameEngineS';


export default class FakeServerEngine extends ServerEngine {

    constructor() {
        const gameEngine = new MyGameEngineS();

        super(null, gameEngine);
    }

    start() {
        super.start();
    }

    step(dt) {
        this.serverTime = new Date().getTime();
        // for each player, replay all the inputs in the oldest step
        for (const playerIdStr of Object.keys(this.playerInputQueues)) {
            const playerId = Number(playerIdStr);
            let inputQueue = this.playerInputQueues[playerId];

            inputQueue.forEach(input => {
                this.gameEngine.processInput(input, playerId);
            });
            inputQueue = [];
        }

        // run the game engine step
        this.gameEngine.step(0, dt);

        // update clients only at the specified step interval, as defined in options
        for (const socketId of Object.keys(this.connectedPlayers)) {
            const player = this.connectedPlayers[socketId];
            if (player.state === 'new') {
                player.state = 'synced';
            }
        }

        const payload = this.serializeUpdate();
        // console.log(`========== sending world update ${this.gameEngine.world.stepCount} is delta update ==========`);

        for (const socketId of Object.keys(this.connectedPlayers))
            this.connectedPlayers[socketId].socket.emit('worldUpdate', payload);
    }

    serializeUpdate() {
        return this.gameEngine.world.entities;
    }

    onPlayerConnected(socket) {
        // save player
        this.connectedPlayers[socket.id] = {
            socket,
            state: 'new'
        };

        // socket id, no need to send it at the moment
        const socketId = socket.playerId = ++this.socketCount;

        // TODO: add the player when the client clicks on Play button 
        const player = this.gameEngine.createPlayer();
        player.socketId = socketId;

        const playerEvent = {
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
        const queue = this.playerInputQueues[playerId];

        // add the input to the player's queue
        queue.push(data);
    }

    onReceivedInput(data, socket) {
        this.queueInputForPlayer(data, socket.playerId);
    }
}