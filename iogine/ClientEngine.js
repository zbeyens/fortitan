/**
 * The client engine is the singleton which manages the client-side
 * process, starting the game engine, listening to network messages,
 * starting client steps, and handling world updates which arrive from
 * the server.
 */
export default class ClientEngine {

    /**
     * - Init an empty inboundMessages list.
     * - Init an empty outboundMessages list.
     *
     * @param {GameEngine} gameEngine - a game engine
     * @param {Object} inputOptions - options object
     * @param {Boolean} inputOptions.autoConnect - if true, the client will automatically attempt connect to server.
     * @param {Boolean} inputOptions.standaloneMode - if true, the client will never try to connect to a server
     * @param {Number} inputOptions.delayInputCount - if set, inputs will be delayed by this many steps before they are actually applied on the client.
     * @param {Number} inputOptions.healthCheckInterval - health check message interval (millisec). Default is 1000.
     * @param {Number} inputOptions.healthCheckRTTSample - health check RTT calculation sample size. Default is 10.
     * @param {Object} inputOptions.syncOptions - an object describing the synchronization method. If not set, will be set to extrapolate, with local object bending set to 0.0 and remote object bending set to 0.6. If the query-string parameter "sync" is defined, then that value is passed to this object's sync attribute.
     * @param {String} inputOptions.scheduler - When set to "render-schedule" the game step scheduling is controlled by the renderer and step time is variable.  When set to "fixed" the game step is run independently with a fixed step time. Default is "render-schedule".
     * @param {String} inputOptions.syncOptions.sync - chosen sync option, can be interpolate, extrapolate, or frameSync
     * @param {Number} inputOptions.syncOptions.localObjBending - amount (0 to 1.0) of bending towards original client position, after each sync, for local objects
     * @param {Number} inputOptions.syncOptions.remoteObjBending - amount (0 to 1.0) of bending towards original client position, after each sync, for remote objects
     * @param {Renderer} Renderer - the Renderer class constructor
     */
    constructor(gameEngine) {
        this.gameEngine = gameEngine;

        this.inboundMessages = [];
        this.outboundMessages = [];
    }

    /**
     * Start the client engine:
     * - Start the game engine.
     * - Connect to the server.
     */
    start() {
        this.gameEngine.start();

        // if (cfg.autoConnect) {
        this.connect();
        // }
    }

    /**
     * Listen to network messages.
     * Extend this method if you want to add own events.
     * Events:
     * - playerJoined: the response when you join the game. Store your id. 
     * - worldUpdate: world update (all updated entities).
     */
    connect(socket) {
        console.log(`connecting to game server`);

        this.socket.on('playerJoined', (data) => {
            // TODO: we can add it to inboundMessages later for buffering.
            this.gameEngine.selfId = data.playerId;
            console.log("player joined");
        });

        this.socket.on('worldUpdate', (data) => {
            this.inboundMessages.push(data);
        });
    }

    /**
     * Execute a single client game step: 
     * - Handle each inbound message and then empty the list.
     * - Handle outbound messages.
     * - Execute a single game engine step.
     * This is normally called by the Renderer at each draw event.
     */
    step(t, dt) {
        while (this.inboundMessages.length > 0) {
            this.handleInboundMessage(this.inboundMessages.pop());
        }

        this.handleOutboundMessages();

        this.gameEngine.step(t, dt);
    }

    /**
     * This function should be called by the client whenever a user input
     * occurs. This function will transmit the input to the server.
     *
     * This function can be called by the extended client engine class,
     * typically at the beginning of client-side step processing
     *
     * @param {String} input - string representing the input
     * @param {Object} inputOptions - options for the input
     */
    sendInput(command, data) {
        const message = {
            command,
            data,
        };

        this.outboundMessages.push(message);
    }

    /**
     * Handle a message that has been received from the server
     * @param  {Object} data    world update
     */
    handleInboundMessage(data) {}

    /**
     * Emit each input to the authoritative server.
     * Then, empty outboundMessages.
     */
    handleOutboundMessages() {
        for (let i = 0; i < this.outboundMessages.length; i++) {
            this.socket.emit(this.outboundMessages[i].command, this.outboundMessages[i].data);
        }

        this.outboundMessages = [];
    }

}


// import io from 'socket.io-client';
// import Utils from './lib/Utils';
// import Scheduler from './lib/Scheduler';
// import Synchronizer from './Synchronizer';
// import Serializer from './serialize/Serializer';
// import NetworkMonitor from './network/NetworkMonitor';
// import NetworkTransmitter from './network/NetworkTransmitter';
// 

// externalizing these parameters as options would add confusion to game
// developers, and provide no real benefit.
// const STEP_DRIFT_THRESHOLDS = {
//     onServerSync: { MAX_LEAD: 1, MAX_LAG: 3 }, // max step lead/lag allowed after every server sync
//     onEveryStep: { MAX_LEAD: 7, MAX_LAG: 8 } // max step lead/lag allowed at every step
// };
// const STEP_DRIFT_THRESHOLD__CLIENT_RESET = 20; // if we are behind this many steps, just reset the step counter
// const GAME_UPS = 60; // default number of game steps per second
// const STEP_DELAY_MSEC = 12; // if forward drift detected, delay next execution by this amount
// const STEP_HURRY_MSEC = 8; // if backward drift detected, hurry next execution by this amount


// constructor(gameEngine) {

//         // this.serializer = new Serializer();
//         this.gameEngine = gameEngine;
//         // this.gameEngine.registerClasses(this.serializer);
//         // this.networkTransmitter = new NetworkTransmitter(this.serializer);
//         // this.networkMonitor = new NetworkMonitor();

//         this.inboundMessages = [];
//         this.outboundMessages = [];


//         // if (!cfg.standaloneMode) {
//         //     this.configureSynchronization();
//         // }
//     }

// configure the Synchronizer singleton
// configureSynchronization() {
//     // const synchronizer = new Synchronizer(this, this.options.syncOptions);
// }

// connect(socket) {
//     // console.log(`connecting to game server ${matchMakerAnswer.serverURL}`);
//     console.log(`connecting to game server`);

//     this.socket.on('playerJoined', (data) => {
//         this.gameEngine.selfId = data.selfId;
//         console.log("player joined");
//     });

//     this.socket.on('worldUpdate', (data) => {
//         this.inboundMessages.push(data);
//     });

//     // let connectSocket = matchMakerAnswer => {
//     //     return new Promise((resolve, reject) => {

//     //         if (matchMakerAnswer.status !== 'ok')
//     //             reject();

//     //         console.log(`connecting to game server ${matchMakerAnswer.serverURL}`);
//     //         this.socket = io(matchMakerAnswer.serverURL, options);

//     //         this.networkMonitor.registerClient(this);

//     //         this.socket.once('connect', () => {
//     //             console.log('connection made');
//     //             resolve();
//     //         });

//     //         this.socket.on('playerJoined', (data) => {
//     //             this.gameEngine.playerId = data.playerId;
//     //             this.messageIndex = Number(this.gameEngine.playerId) * 10000;
//     //         });

//     //         this.socket.on('worldUpdate', (data) => {
//     //             this.inboundMessages.push(data);
//     //         });
//     //     });
//     // };

//     // let matchmaker = Promise.resolve({ serverURL: null, status: 'ok' });
//     // if (this.options.matchmaker)
//     //     matchmaker = Utils.httpGetPromise(this.options.matchmaker);

//     // return matchmaker.then(connectSocket);
// }

// step(t, dt) {
//     this.gameEngine.emit('client__preStep');

//     while (this.inboundMessages.length > 0) {
//         this.handleInboundMessage(this.inboundMessages.pop());
//     }

//     // perform game engine step
//     this.handleOutboundInput();

//     this.gameEngine.step(false, t, dt);
//     this.gameEngine.emit('client__postStep', { dt });
// }

// handleInboundMessage(data) {
//     // let syncEvents = this.networkTransmitter.deserializePayload(data).events;
//     // let syncHeader = syncEvents.find((e) => e.eventName === 'syncHeader');

//     // // emit that a snapshot has been received
//     // this.gameEngine.serverStep = syncHeader.stepCount;
//     this.gameEngine.emit('client__syncReceived', {
//         data: data
//         // syncEvents: syncEvents,
//         // stepCount: syncHeader.stepCount,
//         // fullUpdate: syncHeader.fullUpdate
//     });

//     // console.log(`========== inbound world update ==========`);

//     // // finally update the stepCount
//     // if (syncHeader.stepCount > this.gameEngine.world.stepCount + STEP_DRIFT_THRESHOLD__CLIENT_RESET) {
//     //     this.gameEngine.trace.info(() => `========== world step count updated from ${this.gameEngine.world.stepCount} to  ${syncHeader.stepCount} ==========`);
//     //     this.gameEngine.emit('client__stepReset', { oldStep: this.gameEngine.world.stepCount, newStep: syncHeader.stepCount });
//     //     this.gameEngine.world.stepCount = syncHeader.stepCount;
//     // }
// }