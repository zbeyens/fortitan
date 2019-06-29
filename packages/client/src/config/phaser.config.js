import Phaser from 'phaser';

export const PARENT_DIV_TAG = 'phaser-game';

export const GAME_CONFIG = {
  type: Phaser.CANVAS,
  width: 1280,
  height: 720,
  parent: PARENT_DIV_TAG,
  scale: {
    // mode: Phaser.Scale.RESIZE,
    // width: '100%',
    // height: '100%',
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
};

// grounds: {
//   props: {
//     body: {},
//   },
// },

// tree: {},

// item: {},

// building: {},

// stone: {},

// building
// const config = {

//     //props of each type of entity
//     category: 0x0012,
//     thickness: 10,
//     length: 150,

//     offsetX: 0,
//     offsetY: 100,

//     // keyWalk: 'p1_walk',
//     // urlWalk: 'client/assets/images/temp/p3_walk/p3_walk',
// };

// config.bodyOptions = {
//     inertia: Infinity,
//     isStatic: false,
//     isSensor: true,
//     collisionFilter: {
//         category: config.category,
//     },
// }
