const building = require('./cfgBuilding.js');

/**
 * Config for production
 */
const config = {

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

    sync: 'interpolate', // interpolate, extrapolate, or frameSync

    standaloneMode: true,
    autoConnect: true,

    bgUrl: 'img/background/sun.png',
    bgKey: 'background',
    bgWidth: 2048, //TODO: refactor to worldWidth
    bgHeight: 1024,
    bgScale: 0.9,


    players: {
        keyPlayer1: 'p1',
        urlPlayer1: 'img/temp/p1',
        keyWalk: 'p1_walk',
    },

    grounds: {},

    tree: {},
    
    item: {},

    building: {},

    stone: {},

};


module.exports = config;