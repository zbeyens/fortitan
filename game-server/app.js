const server = require('http').createServer(),
	WebSocketServer = require('ws').Server,
	wss = new WebSocketServer({
		server: server, perMessageDeflate: false, //big headers to compress. Don't need
		// maxPayload: 4096
	});

const cfg = require('./server/config'),
	Game = require('./server/sGame');


server.listen(cfg.serverPort, () => {
	console.log('Server ' + cfg.env);
	console.log('Listening on port ' + cfg.serverPort);
	
	const game = new Game(wss);
	game.start();
});

// Game Instances
const gameEngine = new MyGameEngineServer();
const serverEngine = new MyServerEngine(io, gameEngine);

// start the game
serverEngine.start();