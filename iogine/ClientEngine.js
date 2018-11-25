/**
 * The client engine is the singleton which manages the client-side
 * process, starting the game engine, listening to network messages,
 * starting client steps, and handling world updates which arrive from
 * the server.
 */
export default class ClientEngine {

    /**
     * Init an inboundMessages list.
     * Init an outboundMessages list.
     * Init eventHandlers object with a method for each event.
     * @param {GameEngine} gameEngine - the client game engine
     * @param {List} cfg.entityTypes
     */
    constructor(gameEngine, cfg) {
        this.gameEngine = gameEngine;
        this.cfg = cfg;

        this.inboundMessages = [];
        this.outboundMessages = [];

        this.eventHandlers = {};
        this.eventHandlers.playerJoined = this.onPlayerJoined.bind(this);
        this.eventHandlers.worldUpdate = this.onWorldUpdate.bind(this);
    }

    /**
     * Start the client engine:
     * - Start the game engine.
     * - Connect to the websocket server.
     */
    start() {
        this.gameEngine.start();

        this.connect();
    }

    /**
     * TODO: connect to a real websocket here
     */
    connect() {
        console.log(`connecting to game server`);

        this.setEventHandlers();
    }

    /**
     * Listen to network messages.
     */
    setEventHandlers() {
        for (const event of Object.keys(this.eventHandlers)) {
            this.socket.on(event, (data) => {
                this.inboundMessages.push({
                    event,
                    data
                });
            });
        }
    }

    /**
     * Execute a single client game step: 
     * - Handle inbound messages.
     * - Handle outbound messages.
     * - Execute a single game engine step.
     * This is normally called by the Renderer game loop at each draw event.
     */
    step(dt) {
        this.handleInboundMessages();
        this.handleOutboundMessages();

        this.gameEngine.step(dt);
    }

    /**
     * Handle inbound messages received between the last 2 steps .
     * For each message, call the appropriate event handler
     */
    handleInboundMessages() {
        for (let i = 0; i < this.inboundMessages.length; i++) {
            const msg = this.inboundMessages[i];
            this.eventHandlers[msg.event](msg.data);
        }

        this.inboundMessages = [];
    }

    /**
     * This function should be called by the client whenever a user input
     * occurs.
     * @param {String} event - event name
     * @param {Object} data - input
     */
    sendInput(event, data) {
        const msg = {
            event,
            data,
        };

        this.outboundMessages.push(msg);
    }

    /**
     * Handle outbound messages applied between the last 2 steps 
     * Emit each input to the authoritative server.
     * TODO: as we already check the input 60 tps, we can directly send the input.
     */
    handleOutboundMessages() {
        for (let i = 0; i < this.outboundMessages.length; i++) {
            this.socket.emit(this.outboundMessages[i].event, this.outboundMessages[i].data);
        }

        this.outboundMessages = [];
    }

    /**
     * Response when you join the game. Store the id of your player entity.
     * @param  {Object} data
     */
    onPlayerJoined(data) {
        this.gameEngine.selfId = data.playerId;
    } 

    /**
     * World update: all init, updated and deleted entities.
     * TODO: generalize it -> ClientEngine
     * @param  {Object} data
     */
    onWorldUpdate(data) {
        this.updateEntities(data);
    }
    
    /**
     * For each entity type: `entityType`,
     * For each entity `id` of `entityType` in the server world update: `entityServer`,
     * Check if `id` is in the client world,
     * If not, create the new entity.
     * Else, update the existing entity.
     * @param  {Object} data - world update
     */
    updateEntities(data) {
        for (const entityType of this.cfg.entityTypes) {
            const entitiesServer = data[entityType];
            for (let idServer of Object.keys(entitiesServer)) {
                idServer = Number(idServer);

                const entityServer = entitiesServer[idServer];

                const entitiesView = this.gameEngine.world.entities[entityType];
                if (!entitiesView[idServer]) {
                    const newEntity = this.gameEngine.createEntity(entityType, idServer, entityServer.state, entityServer.props);
                    
                    // if it is a player with selfId, we know selfPlayer 
                    if (entityType === 'players' && idServer === this.gameEngine.selfId) {
                        console.log("Self player init received");
                        this.gameEngine.selfPlayer = newEntity;
                    }
                } else {
                    this.gameEngine.updateEntity(entityType, entityServer);
                }
            }
        }
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


//         // if (!cfg.fakeServer) {
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