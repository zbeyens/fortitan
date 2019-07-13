/** Helps preparing the object to sync with the client */
export default class SyncManager {
  static prepareFromPhaserGroup(group, objects) {
    group.children.iterate(sprite => {
      SyncManager.prepareFromPhaserSprite(sprite, objects);
    });
  }

  static prepareFromPhaserSprite(sprite, objects) {
    const obj = {
      ...sprite,
      ...this.getXY(sprite),
    };
    objects.push(SyncManager.cleanObjectToSync(obj));
  }

  static prepareFromMatterGameObject(gameObjects, objects) {
    gameObjects.forEach(obj => {
      objects.push(SyncManager.cleanObjectToSync(obj));
    });
  }

  static getXY(child) {
    return {
      x: child.body.position.x + child.body.width / 2,
      y: child.body.position.y + child.body.height / 2,
    };
  }

  static mergeObjectToSync(obj, mergeTo) {
    let merged = false;
    Object.keys(mergeTo).forEach(o => {
      if (o === obj.id) {
        mergeTo[obj.id] = {
          ...mergeTo[obj.id],
          ...obj,
        };
        merged = true;
      }
    });
    if (!merged)
      mergeTo = {
        ...mergeTo,
        [obj.id]: obj,
      };
    return mergeTo;
  }

  static cleanObjectToSync(obj) {
    let objectToSync = {};

    const addToObjectToSync = (key, prop) => {
      if (prop !== null) objectToSync = { ...objectToSync, [key]: prop };
    };

    addToObjectToSync('id', obj.id || obj.body.id);
    addToObjectToSync('x', obj.x || obj.body.position.x || null);
    addToObjectToSync('y', obj.y || obj.body.position.y || null);
    addToObjectToSync('angle', obj.angle !== 'undefined' ? obj.angle : null);
    addToObjectToSync('dead', obj.dead !== 'undefined' ? obj.dead : null);
    addToObjectToSync('skin', obj.skin !== 'undefined' ? obj.skin : null);
    addToObjectToSync('animation', obj.animation || null);
    addToObjectToSync('direction', obj.direction || null);
    addToObjectToSync('scale', obj.scale && obj.scale !== 1 ? obj.scale : null);
    addToObjectToSync('tint', obj.tint ? obj.tint : null);
    addToObjectToSync('clientId', obj.clientId || null);
    addToObjectToSync('category', obj.category || null);

    // Object.keys(objectToSync).forEach(key => objectToSync[key] == null && delete objectToSync[key])

    return objectToSync;
  }

  static get keys() {
    // sort these based on most used
    return [
      'id',
      'x',
      'y',
      'angle',
      'dead',
      'skin',
      'animation',
      'direction',
      'scale',
      'tint',
      'clientId',
      'category',
    ];
  }

  static decode(data) {
    const { keys } = SyncManager;
    const decodedArray = [];

    let obj = {};
    data.split(',').forEach((value, index) => {
      const key = keys[index % keys.length];

      // id (radix 36)
      if (key === 'id') {
        obj[key] = parseInt(value, 36).toString();
      }
      // numbers
      else if (['skin', 'scale'].includes(key)) {
        obj[key] = value !== '' ? parseInt(value, 10) : null;
      }
      // numbers (radix 36)
      else if (['x', 'y', 'angle', 'clientId'].includes(key)) {
        obj[key] = value !== '' ? parseInt(value, 36) : null;
      }
      // booleans
      else if (['dead'].includes(key)) {
        obj[key] = value === '0' ? false : value === '1' ? true : null;
      }
      // strings
      else obj[key] = value !== '' ? value : null;

      if (index % keys.length === keys.length - 1) {
        decodedArray.push({ ...obj });
        obj = {};
      }
    });

    return decodedArray;
  }

  static encode(objs) {
    const { keys } = SyncManager;

    let encodedString = '';
    objs.forEach(obj => {
      keys.forEach(key => {
        if (typeof obj[key] !== 'undefined') {
          let value = obj[key];

          // booleans
          if (typeof obj[key] === 'boolean') value = obj[key] === false ? 0 : 1;
          // some numbers to radix 36
          else if (['id', 'x', 'y', 'angle', 'clientId'].includes(key)) {
            value = +value;
            value = +value.toFixed(0);
            value = value.toString(36);
          }

          encodedString += `${value},`;
        } else encodedString += ',';
      });
    });

    return encodedString.slice(0, -1);
  }
}
