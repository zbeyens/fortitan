const cfg = require('./config');
// Server = require('./Server');
// Fps = require('../shared/tools/Fps');

/*
Start physics loop on existing players and entities : get and update a new state.
Instanciate and start a server.
*/
class Game {
    constructor(wss) {
        this.startTime = 0;
        
        this.tickPhysics = 0;
        this.lastPhysicsTs = 0;
        
        this.tickMainTs = 0;
        
        // this.server = new Server(this, wss);
        
        // this.world = new World();
        
        // this.fps = new Fps();
        this.fps.startServer();
    }
    
    start() {
        this.startTime = new Date();
        this.lastPhysicsTs = new Date();
        this.lastMainTs = new Date();

        setTimeout(() => {
            this.mainLoop();
        }, 1);

        setInterval(() => {
            this.fps.setFps(new Date());
        }, 1000 / 60);
    }
    
    mainLoop() {
        setTimeout(() => {
            this.physicsLoop();
        }, 0);

        setTimeout(() => {
            // const localTime = this.lastPhysicsTs - this.startTime;
            // this.server.stateController.broadcastState(localTime);
        }, 0);

        // const nowTs = new Date();
        // const deltaTime = (nowTs - this.lastMainTs);
        // this.tickMain += deltaTime;
        // this.lastMainTs = nowTs;
        // if (this.tickMain < cfgs.tickMain) return; //50ms
        // this.tickMain = 0;
        // 
        // this.tickBoard++; 
        // if (this.tickBoard < cfgs.tickBoard) return; //500ms
        // this.tickBoard = 0;
        // 
        // setTimeout(() => {
        //     // this.server.stateController.tileController.playerController.updateBoard();
        // }, 0); 
    }
    
    physicsLoop() {
        this.tickPhysics++;
        if (this.tickPhysics < cfg.tickPhysics) return;
        this.tickPhysics = 0;
        
        const now = new Date();
        // const physicsDelta = (now - this.lastPhysicsTs);
        
        // const world = 
    }
}

module.exports = Game;