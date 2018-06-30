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
    
    //props of each type of entity
    playerCategory: 0x0001,
    playerBodyRadius: 64,
    playerSpeed: 5,
    playerHittingCd: 500,
    playerHittingRayWidth: 10,
    playerHittingRayRange: 100,

    treeBodyRadius: 64,
    treeCategory: 0x0010,

    stoneBodyRadius: 128,
    stoneCategory: 0x0011,

};

config.playerMask = config.treeCategory | config.stoneCategory;
config.treeMask = config.playerCategory;
config.stoneMask = config.stoneCategory;
module.exports = config;