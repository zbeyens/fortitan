const server = require('http').createServer(),
	WebSocketServer = require('ws').Server,
	wss = new WebSocketServer({
		server: server, perMessageDeflate: false, //big headers to compress. Don't need
		// maxPayload: 4096
	});

const cfgs = require('./server/config'),
	Game = require('./server/sGame');


server.listen(cfgs.serverPort, () => {
	console.log('Server ' + cfgs.env);
	console.log('Listening on port ' + cfgs.serverPort);
	
	const game = new Game(wss);
	game.start();
});