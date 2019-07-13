/** Handles all the communication for /stats namespace (ioNspGame) */
export default class IoStats {
  constructor(ioNspStats) {
    this.ioNspStats = ioNspStats;
    this.totalObjects = {};
  }

  /** This function will console.log and send it to the ioStats */
  log(log, logInNode = false) {
    if (logInNode) console.info(`LOG: ${log}`);
    this.ioNspStats.emit('getLog', { date: new Date(), log });
  }

  /** Get the total of objects in the game */
  getTotalObjects() {
    let count = 0;
    Object.keys(this.totalObjects).forEach(roomId => {
      count += this.totalObjects[roomId].count;
    });
    return count;
  }

  setTotalObjects(roomId, count) {
    this.totalObjects = { ...this.totalObjects, [roomId]: { count } };
  }

  removeTotalObjects(roomId) {
    if (this.totalObjects && this.totalObjects[roomId]) {
      delete this.totalObjects[roomId];
    }
  }
}
