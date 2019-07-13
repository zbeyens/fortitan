import { Math as phaserMath } from 'phaser';
import uuidv4 from 'uuid/v4';
import GameServer from '../game/Game.server';

const randomDataGenerator = new phaserMath.RandomDataGenerator();

const MAX_PLAYERS_PER_ROOM = 4;
const USER_KICK_TIMEOUT = 60000;

export default class RoomManager {
  constructor(ioNspGame, stats) {
    this.ioNspGame = ioNspGame;
    this.stats = stats;

    this.rooms = {};

    setInterval(() => {
      this.removeInactiveRooms();
      this.removeInactiveUsers();
    }, 10000);
  }

  generateClientId(socket) {
    const clientId = randomDataGenerator.integerInRange(100000, 100000000);
    socket.clientId = clientId;
    socket.emit('clientId', clientId);
  }

  // the 2 functions below should be better
  async joinRoom(socket, scene, level) {
    if (typeof scene !== 'string' || typeof level !== 'number') {
      console.error('level or scene is not defined in ioGame.ts');
      return;
    }
    socket.room = this.chooseRoom({ scene, level: +level });

    // create a new game instance if this room does not exist yet
    if (!this.rooms[socket.room]) {
      await this.createRoom(socket.room, scene, +level);
    }

    this.addUser(socket);
    this.rooms[socket.room].scene.events.emit(
      'createDude',
      socket.clientId,
      socket.id
    );
  }

  leaveRoom(socket) {
    this.removeUser(socket.room, socket.id);
    this.ioNspGame.in(socket.room).emit('S' /* short for syncGame */, {
      connectCounter: this.getRoomUsersArray(socket.room).length,
    });

    if (this.isRemoving(socket.room)) return;
    this.rooms[socket.room].scene.events.emit('removeDude', socket.clientId);
  }

  async changeRoom(socket, scene, level) {
    this.leaveRoom(socket);
    await this.joinRoom(socket, scene, +level);
    socket.emit('changingRoom', { scene, level: +level });
  }

  addUser(socket) {
    const newUsers = {
      [socket.id]: {
        roomId: socket.room,
        lastUpdate: Date.now(),
        clientId: socket.clientId,
        id: socket.id,
      },
    };

    this.rooms[socket.room].users = {
      ...this.rooms[socket.room].users,
      ...newUsers,
    };
    // join the socket room
    socket.join(socket.room);
  }

  /** Removed the user from the room */
  removeUser(roomId, userId, log = true) {
    if (this.ioNspGame.sockets[userId])
      this.ioNspGame.sockets[userId].leave(roomId);

    if (this.userExists(roomId, userId)) {
      delete this.rooms[roomId].users[userId];
      if (log) this.stats.log(`User <b>${userId}</b> disconnected!`);
      return true;
    }
    return false;
  }

  /** Check if this user exists */
  userExists(roomId, userId) {
    if (
      this.roomExists(roomId) &&
      this.rooms[roomId].users &&
      this.rooms[roomId].users[userId]
    )
      return true;
    return false;
  }

  /** Check if this room exists */
  roomExists(roomId) {
    if (this.rooms && this.rooms[roomId]) return true;
    return false;
  }

  isRemoving(roomId) {
    if (!this.rooms[roomId] || this.rooms[roomId].removing) return true;
    return false;
  }

  createRoom = async (roomId, scene, level) => {
    this.stats.log(`Create new room <b>${roomId}</b>`);

    const game = await GameServer(this, roomId, { scene, level });

    this.rooms[roomId] = {
      sceneKey: scene,
      level: +level,
      roomId,
      users: {},
      game,
      // @ts-ignore
      scene: game.scene.keys.MainScene,
      removing: false,
    };

    this.stats.log(`Room <b>${roomId}</b> created!`);
  };

  removeRoom = async roomId => {
    if (this.rooms[roomId].removing) return;
    this.stats.log(`Removing room <b>${roomId}</b>`);
    this.rooms[roomId].removing = true;
    this.rooms[roomId].scene.events.emit('stopScene');

    setTimeout(async () => {
      await this.rooms[roomId].game.destroy(true, true);
      // @ts-ignore
      this.rooms[roomId].game = null;
      delete this.rooms[roomId];

      this.stats.log(`Room <b>${roomId}</b> has been removed!`);
      this.stats.log(`Remaining rooms: ${Object.keys(this.rooms).length}`);
    }, 5000);
  };

  chooseRoom = props => {
    const { scene, level } = props;

    const rooms = Object.keys(this.rooms);

    if (rooms.length === 0) return uuidv4();

    // check for the next room with 1 or more free spaces
    let chosenRoom = null;
    for (let i = 0; i < Object.keys(this.rooms).length; i++) {
      const room = this.rooms[rooms[i]];
      const count = Object.keys(room.users).length;
      if (
        count < MAX_PLAYERS_PER_ROOM &&
        room.sceneKey === scene &&
        room.level === level &&
        !this.isRemoving(rooms[i])
      ) {
        chosenRoom = rooms[i];
        break;
      }
    }
    if (chosenRoom) return chosenRoom;

    // create a new room with a new uuidv4 id
    return uuidv4();
  };

  getRoomsArray() {
    const rooms = [];
    Object.keys(this.rooms).forEach(roomId => {
      rooms.push(this.rooms[roomId]);
    });
    return rooms;
  }

  /** Returns an Array of all users in a specific room */
  getRoomUsersArray(roomId) {
    const users = [];

    if (!this.roomExists(roomId)) return users;

    Object.keys(this.rooms[roomId].users).forEach(userId => {
      users.push(this.rooms[roomId].users[userId]);
    });
    return users;
  }

  /** Returns an Array of all users in all rooms */
  getAllUsersArray() {
    const users = [];
    Object.keys(this.rooms).forEach(roomId => {
      Object.keys(this.rooms[roomId].users).forEach(userId => {
        users.push(this.rooms[roomId].users[userId]);
      });
    });
    return users;
  }

  disconnectUser(userId) {
    if (this.ioNspGame.connected && this.ioNspGame.connected[userId]) {
      this.ioNspGame.connected[userId].disconnect(true);
      return true;
    }
    return false;
  }

  removeInactiveRooms() {
    this.getRoomsArray().forEach(room => {
      if (!room.users || Object.keys(room.users).length === 0)
        this.removeRoom(room.roomId);
    });
  }

  removeInactiveUsers() {
    this.getAllUsersArray().forEach(user => {
      if (Date.now() - user.lastUpdate > USER_KICK_TIMEOUT) {
        const removed = this.removeUser(user.roomId, user.id, false);
        const disconnected = this.disconnectUser(user.id);
        if (removed && disconnected) {
          this.stats.log(
            `Kick user <b>${user.clientId}</b> from room <b>${user.roomId}</b>`
          );
        }
      }
    });
  }
}
