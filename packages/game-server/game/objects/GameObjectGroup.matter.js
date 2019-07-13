import Phaser from 'phaser';
import Player from './Player';

export default class GameObjectGroup {
  constructor(scene, objects) {
    this.scene = scene;
    this.objects = objects;

    this.Matter = Phaser.Physics.Matter.Matter;
  }

  killById(id) {
    this.objects.forEach(obj => {
      if (obj.body.id === id) obj.kill();
    });
  }

  getObjectById(id) {
    let object;
    this.objects.forEach(obj => {
      if (obj.body.id === id) object = obj;
    });
    return object;
  }

  add(x, y, type, options) {
    // const { clientId, socketId, category } = options;
    const { clientId, socketId } = options;

    // create a new object and add it to the objects array
    // if (type === 'box') object = new Box(this.scene, x, y);
    // else if (
    //   typeof clientId !== 'undefined' &&
    //   typeof socketId !== 'undefined'
    // )
    const object = new Player(this.scene, x, y, clientId, socketId);
    if (object) this.objects.push(object);

    return object;
  }
}
