import 'source-map-support/register';
import SocketIOStatic from 'socket.io';
import RoomManager from './managers/roomManager';
import IoStats from './socket/ioStats';
import IoGame from './socket/ioGame';

const server = require('http').Server;

const io = SocketIOStatic(server);

const port = process.env.PORT || 3000;

// create 2 socket.io namespaces
const ioNspGame = io.of('/G' /* short for stats */);
const ioNspStats = io.of('/S' /* short for stats */);

const ioStats = new IoStats(ioNspStats);
const roomManager = new RoomManager(ioNspGame, ioStats);
// const ioGame = new IoGame(ioNspGame, ioStats, roomManager);
new IoGame(ioNspGame, ioStats, roomManager);

server.listen(port, () => {
  console.info(`App is listening on port ${port}`);
});

// import Routes from './routes/routes';

// app.use('/', new Routes(roomManager, ioStats).router);
