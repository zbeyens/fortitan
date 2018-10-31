// Shared config - inherited by server and client configs
const cfg = {

    entityTypes: [
        'players',
        'grounds',
        'resources'
    ],

    tileSize: 128,

    players: {
        props: {
            atlasIndex: 0,
        }
    },

    grounds: {
        props: {
            textureIndex: 0,
            body: {}
        }
    },

};

module.exports = cfg;