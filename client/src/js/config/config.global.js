const _ = require('lodash');
const configShared = require('../../../../shared/config');

// Client config
const cfg = {

    phaserConfig: {
        renderer: Phaser.AUTO,
        parent: 'content',
        width: 1280,
        height: 720,
        // scaleMode: Phaser.ScaleManager.SHOW_ALL,
        antialias: true,
        // transparent: false,
    },

    showStats: false,

    // sync: 'interpolate', // interpolate, extrapolate, or frameSync

    standaloneMode: true,
    autoConnect: true,

    bg: {
        url: 'img/background/sun.png',
        key: 'background',
        width: 2048, //TODO: refactor to worldWidth
        height: 1024,
        scale: 0.9,
    },


    // players: {
    // 
    // },

    grounds: {
        props: {
            body: {}
        }
    },

    textures: {
        players: [
            'img/temp/p1.png'
        ],
        grounds: [
            'img/tiles/Spring/128x128/GrassMid.png',
        ],
    },

    atlases: {
        players: [
            'img/temp/p1'
        ],
    },

    animations: {
        players: {
            walk: {
                nFrames: 11,
                offset: 2,
            },
        },
    },

    tree: {},

    item: {},

    building: {},

    stone: {},

};

const config = {};
_.merge(config, configShared, cfg);
module.exports = config;

// building
// const config = {

//     //props of each type of entity
//     category: 0x0012,
//     thickness: 10,
//     length: 150,

//     offsetX: 0,
//     offsetY: 100,

//     // keyWalk: 'p1_walk',
//     // urlWalk: 'client/img/temp/p3_walk/p3_walk',
// };


// config.bodyOptions = {
//     inertia: Infinity,
//     isStatic: false,
//     isSensor: true,
//     collisionFilter: {
//         category: config.category,
//     },
// }