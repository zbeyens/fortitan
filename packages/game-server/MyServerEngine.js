import ServerEngine from 'iogine/ServerEngine';




export default class MyServerEngine extends ServerEngine {

    constructor(wss, gameEngine) {
        super(wss, gameEngine);

        this.eventHandlers.playGame = this.onPlayGame.bind(this);
    }

    onSocketConnected(ws) {
        super.onSocketConnected(ws);
    }

    /**
     * Event - on new player in the game:
     * Create the player entity, store its socket id and
     * emit its entity id.
     * @param  {Socket} ws - socket
     */
    onPlayGame(ws) {
        const player = this.gameEngine.createPlayer();
        player.socketId = ws.socketId;

        const data = {
            playerId: player.id,
        };

        ws.inGame = true;
        ws.emit('playerJoined', data);
    }

    // TODO
    onSocketDisconnect(socketId, playerId) {}
}