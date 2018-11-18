// import Utils from './lib/Utils';
// import Scheduler from './lib/Scheduler';
// import Serializer from './serialize/Serializer';
// import NetworkTransmitter from './network/NetworkTransmitter';
// import NetworkMonitor from './network/NetworkMonitor';

/**
 * ServerEngine is the main server-side singleton code.
 * Extend this class with your own server-side logic, and
 * start a single instance.
 *
 * This class should not be used to contain the actual
 * game logic.  That belongs in the GameEngine class, where the mechanics
 * of the gameplay are actually implemented.
 * The ServerEngine singleton is typically a lightweight
 * implementation, logging gameplay statistics and registering
 * user activity and user data.
 *
 * The base class implementation is responsible for starting
 * the server, initiating each game step, accepting new
 * connections and dis-connections, emitting periodic game-state
 * updates, and capturing remote user inputs.
 */
export default class ServerEngine {

    /**
     * Create a ServerEngine instance
     *
     * @param {Websocket} wss - Websocket server
     * @param {GameEngine} gameEngine - instance of GameEngine
     */
    constructor(wss, gameEngine) {
        this.wss = wss;
        this.gameEngine = gameEngine;

        this.socketCount = 0;
        this.connectedPlayers = {};
        this.playerInputQueues = {};

        wss.on('connection', this.onSocketConnected.bind(this));

        this.eventHandlers = {};
        this.eventHandlers.move = this.onInputMove.bind(this);
    }

    /**
     * Start the GameEngine of the server
     */
    start() {
        this.gameEngine.start();
    }

    /**
     * Process the received inputs
     * Update the game engine
     * Broadcast the world update at the specified step interval
     * @param  {Number} dt
     */
    step(dt) {
        this.serverTime = new Date().getTime();
        
        this.processInputs();

        this.gameEngine.step(dt);

        // TODO: update clients only at the specified step interval, as defined in options
        // IF ...
        this.broadcastWorldUpdate();
    }

    /**
     * Broadcast the world update to every player in game.
     * Serialize the update and the send it.
     */
    broadcastWorldUpdate() {
        for (const socketId of Object.keys(this.connectedPlayers)) {
            const player = this.connectedPlayers[socketId];
            if ( player.state === 'new') {
                player.state = 'synced';
            }
        }

        const payload = this.serializeUpdate();

        for (const socketId of Object.keys(this.connectedPlayers)) {
            // const player = this.connectedPlayers[socketId];
            // if (!player.socket.inGame) continue;

            this.connectedPlayers[socketId].socket.emit('worldUpdate', payload);
        }
    }

    /**
     * Event - on client connnected to the server:
     * Update the socket count and store the client socket.
     * @param  {Socket} ws - socket
     */
    onSocketConnected(ws) {
        ws.socketId = ++this.socketCount;

        // save player
        this.connectedPlayers[ws.socketId] = {
            socket: ws
        };

        this.setEventHandlers(ws);
    }

    setEventHandlers(ws) {
        for (const event of Object.keys(this.eventHandlers)) {
            ws.on(event, (data) => {
                this.queueInputForPlayer({
                    event,
                    data,
                }, ws.socketId);
            });
        }
    }

    /**
     * Queue the inputs of one player. Create the queue if not existing
     * @param  {Object} msg - input
     * @param  {Number} socketId - socket id
     */
    queueInputForPlayer(msg, socketId) {
        // create an input queue for this player, if one doesn't already exist
        if (!this.playerInputQueues.hasOwnProperty(socketId))
            this.playerInputQueues[socketId] = [];
        const queue = this.playerInputQueues[socketId];

        // add the input to the player's queue
        queue.push(msg);
    }

    /**
     * For each player, process all the inputs received 
     * between the last 2 steps and empty the queue. 
     */
    processInputs() {
        for (const socketIdStr of Object.keys(this.playerInputQueues)) {
            const socketId = Number(socketIdStr);
            const inputQueue = this.playerInputQueues[socketId];

            const ws = this.connectedPlayers[socketId].socket;
            inputQueue.forEach(input => {
                this.eventHandlers[input.event](ws, input.data);
            });
            this.playerInputQueues[socketId] = [];
        }
    }

    onInputMove(ws, input) {
        this.gameEngine.processInput(input, ws.socketId);
    }

    // TODO
    resetIdleTimeout(ws) {}

    onSocketDisconnect(socketId, playerId) {}

    serializeUpdate(options) {}

    onObjectAdded(obj) {}

    onObjectDestroyed(obj) {}

}

// // handle new player connection
// onPlayerConnected(socket) {
//     let that = this;

//     console.log('Client connected');

//     // save player
//     this.connectedPlayers[socket.id] = {
//         socket: socket,
//         state: 'new'
//     };
//     let playerId = socket.playerId = ++this.gameEngine.world.playerCount;
//     socket.lastHandledInput = null;
//     socket.joinTime = (new Date()).getTime();
//     this.resetIdleTimeout(socket);

//     console.log('Client Connected', socket.id);

//     let playerEvent = { id: socket.id, playerId, joinTime: socket.joinTime, disconnectTime: 0 };
//     this.gameEngine.emit('server__playerJoined', playerEvent);
//     this.gameEngine.emit('playerJoined', playerEvent);
//     socket.emit('playerJoined', playerEvent);

//     socket.on('disconnect', function() {
//         playerEvent.disconnectTime = (new Date()).getTime();
//         that.onPlayerDisconnected(socket.id, playerId);
//         that.gameEngine.emit('server__playerDisconnected', playerEvent);
//         that.gameEngine.emit('playerDisconnected', playerEvent);
//     });

//     // todo rename, use number instead of name
//     socket.on('move', function(data) {
//         that.onReceivedInput(data, socket);
//     });

//     // we got a packet of trace data, write it out to a side-file
//     socket.on('trace', function(traceData) {
//         traceData = JSON.parse(traceData);
//         let traceString = '';
//         traceData.forEach(t => { traceString += `[${t.time}]${t.step}>${t.data}\n`; });
//         fs.appendFile(`${that.options.tracesPath}client.${playerId}.trace`, traceString, err => { if (err) throw err; });
//     });

//     this.networkMonitor.registerPlayerOnServer(socket);
// }

// // handle player timeout
// onPlayerTimeout(socket) {
//     console.log(`Client timed out after ${this.options.timeoutInterval} seconds`, socket.id);
//     socket.disconnect();
// }

// // handle player dis-connection
// onPlayerDisconnected(socketId, playerId) {
//     delete this.connectedPlayers[socketId];
//     console.log('Client disconnected');
// }

// // create a serialized package of the game world
// // TODO: this process could be made much much faster if the buffer creation and
// //       size calculation are done in a single phase, along with string pruning.
// serializeUpdate(options) {
//     let world = this.gameEngine.world;
//     let diffUpdate = Boolean(options && options.diffUpdate);

//     // add this sync header
//     // currently this is just the sync step count
//     this.networkTransmitter.addNetworkedEvent('syncHeader', {
//         stepCount: world.stepCount,
//         fullUpdate: Number(!diffUpdate)
//     });

//     for (let objId of Object.keys(world.entities)) {
//         let obj = world.entities[objId];
//         let prevObject = this.objMemory[objId];

//         // if the object (in serialized form) hasn't changed, move on
//         if (diffUpdate) {
//             let s = obj.serialize(this.serializer);
//             if (prevObject && Utils.arrayBuffersEqual(s.dataBuffer, prevObject))
//                 continue;
//             else
//                 this.objMemory[objId] = s.dataBuffer;

//             // prune strings which haven't changed
//             obj = obj.prunedStringsClone(this.serializer, prevObject);
//         }

//         this.networkTransmitter.addNetworkedEvent('objectUpdate', {
//             stepCount: world.stepCount,
//             objectInstance: obj
//         });
//     }

//     // remove memory objects which no longer exist
//     if (diffUpdate) {
//         for (let objId of Object.keys(this.objMemory)) {
//             if (!(objId in world.entities)) {
//                 delete this.objMemory[objId];
//             }
//         }
//     }

//     return this.networkTransmitter.serializePayload();
// }


// /**
//  * NOTE: why use steps? iogine will not use for now
//  * Add an input to the input-queue for the specific player
//  * each queue is key'd by step, because there may be multiple inputs
//  * per step
//  * @param  {Object} data     input
//  * @param  {[type]} playerId [description]
//  */
// queueInputForPlayer(data, playerId) {
//     // create an input queue for this player, if one doesn't already exist
//     if (!this.playerInputQueues.hasOwnProperty(playerId))
//         this.playerInputQueues[playerId] = {};
//     const queue = this.playerInputQueues[playerId];

//     // create an array of inputs for this step, if one doesn't already exist
//     if (!queue[data.step]) queue[data.step] = [];

//     // add the input to the player's queue
//     queue[data.step].push(data);
// }

// /**
//  * Resets the idle timeout for a given player
//  * TODO: later
//  * @param  {Object} socket
//  */
// resetIdleTimeout(socket) {
//     if (socket.idleTimeout) clearTimeout(socket.idleTimeout);
//     if (this.options.timeoutInterval > 0) {
//         socket.idleTimeout = setTimeout(() => {
//             this.onPlayerTimeout(socket);
//         }, this.options.timeoutInterval * 1000);
//     }
// }

// /**
//  * Report game status
//  * This method is only relevant if the game uses MatchMaker functionality.
//  * This method must return the game status.
//  *
//  * @return {String} Stringified game status object.
//  */
// gameStatus() {
//     const gameStatus = {
//         numPlayers: Object.keys(this.connectedPlayers).length,
//         upTime: 0,
//         cpuLoad: 0,
//         memoryLoad: 0,
//         players: {}
//     };

//     for (const p of Object.keys(this.connectedPlayers)) {
//         gameStatus.players[p] = {
//             frameRate: 0,
//         };
//     }

//     return JSON.stringify(gameStatus);
// }
// 
// this.serializer = new Serializer();
// this.gameEngine.registerClasses(this.serializer);
// this.networkTransmitter = new NetworkTransmitter(this.serializer);
// this.networkMonitor = new NetworkMonitor();