import EventEmitter from 'eventemitter3';
import MyClientEngine from './MyClientEngine';
import MyGameEngineS from '../../../game-server/MyGameEngineS';
import FakeServerEngine from '../../../game-server/FakeServerEngine';

/**
 * Fake client engine connecting to a fake server engine.
 * The purpose is to test the client-server architecture easily without latency
 * as the messages are instant using the client `step` funtion.
 */
export default class FakeClientEngine extends MyClientEngine {

	/**
	 * Create a fake Websocket server
	 * Init the game engine of the server.
	 * Init the fake server engine.
	 * @param  {GameEngine} gameEngine - game engine of the client
	 */
    constructor(gameEngine) {
        super(gameEngine);

        const wss = new EventEmitter();

        const gameEngineS = new MyGameEngineS();
        this.serverEngine = new FakeServerEngine(wss, gameEngineS);
    }

    /**
     * Start the fake server engine.
     * Start the client engine. 
     */
    start() {
        this.serverEngine.start();

        super.start();
    }

    /**
     * Create a fake client socket
     * Set the client event listeners
     * Connect to the fake server
     */
    connect() {
        this.socket = new EventEmitter();

        super.connect();

        this.serverEngine.wss.emit('connection', this.socket);
    }

    /**
     * Step of the server engine.
     * Step of the client engine.
     */
    step(dt) {
        this.serverEngine.step(dt);
        super.step(dt);
    }

}