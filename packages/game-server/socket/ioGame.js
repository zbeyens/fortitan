/** Handles all the communication for /game namespace (ioNspGame) */
export default class IoGame {
  constructor(ioNspGame, ioStats, roomManager) {
    this.time = new Date();

    ioNspGame.on('connection', async socket => {
      roomManager.generateClientId(socket);

      socket.on('joinRoom', async data => {
        const { scene, level } = data;
        await roomManager.joinRoom(socket, scene, +level);
        ioStats.log(
          `New user <b>${socket.id}</b> connected! to room ${socket.room}`
        );
      });

      socket.on('disconnect', () => {
        roomManager.leaveRoom(socket);
      });

      socket.on('changeRoom', data => {
        roomManager.changeRoom(socket, data.scene, +data.level);
      });

      socket.on('sendPing', id => {
        socket.emit('getPong', id);
      });

      socket.on('U' /* short for updateDude */, updates => {
        if (roomManager.isRemoving(socket.room)) return;
        if (!roomManager.userExists(socket.room, socket.id)) return;

        roomManager.rooms[socket.room].users[socket.id].lastUpdate = Date.now();
        roomManager.rooms[socket.room].scene.events.emit(
          'U' /* short for updateDude */,
          {
            clientId: socket.clientId,
            updates,
          }
        );
      });

      socket.on('getInitialState', () => {
        if (roomManager.isRemoving(socket.room)) return;
        if (!roomManager.roomExists(socket.room)) return;

        const payload = {
          time: this.time,
          O /* short for objects */: roomManager.rooms[
            socket.room
          ].scene.getInitialState(),
          connectCounter: roomManager.getRoomUsersArray(socket.room).length,
          initialState: true,
          roomId: socket.room,
        };

        socket.emit('S' /* short for syncGame */, payload);
        // ioNspGame.in(socket.room).emit('S' /* short for syncGame */, payload)
      });
    });
  }
}
