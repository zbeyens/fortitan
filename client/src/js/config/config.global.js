const _ = require('lodash');
const configShared = require('../../../../shared/config');

// Client config
const cfg = {

    phaserConfig: {
        renderer: Phaser.AUTO,
        parent: 'content',
        width: 1280,
        height: 700,
        scaleMode: Phaser.ScaleManager.NO_SCALE,
        resolution: 1,
        // antialias: true,
    },

    debug: {
        stats: 1, // Shows the FPS
        cameraInfo: 1, // Render camera information including dimensions and location.
        camera: 0, // Marks the follow target and deadzone.
        inputInfo: 0, // Render debug information about the Input object.
        scale: 0, // Prints game/canvas dimensions and game scale settings.
    },

    aspectRatio: 1.77777778, // 16 / 9

    // sync: 'interpolate', // interpolate, extrapolate, or frameSync

    autoConnect: true,

    world: {
        bounds: {
            width: 20480,
            height: 1024,
            scale: 0.9,
        },
    },

    bg: {
        scale: 3
    },


    // players: {
    // 
    // },

    grounds: {
        props: {
            body: {}
        }
    },

    images: {
        mainMenuBg: [
            'img/icons/bg-2.png',
        ],
        mainMenuTitle: [
            'img/title.png'
        ],
        bg: [
            'img/background/sun.png'
        ],
        players: [
            'img/temp/p1.png'
        ],
        grounds: [
            'img/tiles/Spring/128x128/GrassMid.png',
        ],

        inventoryBar: [
            'img/InventoryBar1.png'
        ],
        // 'img/SpriteWay/StonePick.png'
        // 'img/tiles/Spring/256x256/GrassJoinHillRight2&Left2 DownShadow.png'
        // 'img/tree/Asset 1.png'
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

    hud: {
        nResources: {
            text: 'Resource : 0',
        },
        inventoryBar: {
            scale: 0.4,
        }
    },

    styles: {
        numbers: {
            fontSize: '32px',
            fontWeight: 'bold',
            fill: '#FFFFFF',
            strokeThickness: 3,
        },
    },

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