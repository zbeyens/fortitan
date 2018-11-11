// Shared config - inherited by server and client configs
const cfg = {

    debug: {
        physics: true,
        standaloneMode: true,
    },

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
        tile: {
            position: {
                x: 0,
                y: 6,
            },
            width: 80,
            height: 1,
        },

        props: {
            imageIndex: 0,
            body: {}
        }
    },

};

module.exports = cfg;