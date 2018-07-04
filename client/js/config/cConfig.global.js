let player = require('./ccfgPlayer.js');
let tree = require('./ccfgTree.js');
let ground = require('./ccfgGround.js');

/**
 * Client config for production
 * @type {Object}
 */
const config = {

    env: 'production',

    phaserConfig: {
        renderer: Phaser.AUTO,
        parent: 'content',
        width: 1280,
        height: 720,
        // scaleMode: Phaser.ScaleManager.SHOW_ALL,
        antialias: true,
        // transparent: false,
    },

    player: player,
    tree: tree,
    ground: ground,

    stoneBodyRadius: 128,
    stoneCategory: 0x0011,

};

config.player.bodyOptions.collisionFilter.mask = config.treeCategory | config.stoneCategory;
config.tree.bodyOptions.collisionFilter.mask = config.player.category;
config.stoneMask = config.stoneCategory;

module.exports = config;