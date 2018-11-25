const _ = require('lodash');
const configShared = require('../../shared/config');


// Server config
const cfg = {
    players: {
        speed: 5,
        jumpForce: -13,

        hittingCd: 500,
        hittingRayWidth: 10,
        hittingRayRange: 100,

        state: {
            position: {
                x: 300,
                y: 300,
            },
            direction: {
                x: 0,
                y: 0
            }
        },

        body: {
            width: 72,
            height: 90,
            options: {
                inertia: Infinity, //prevents player rotation
                // friction: 0.002, 
                // friction: 0, 
                // frictionAir: 0,
                isStatic: false,
                // collisionFilter: {
                //     // group
                //     category: 0x0001,
                // },
            }
        },
        props: {}
    },

    grounds: {
        props: {},
        body: {
            options: {
                inertia: Infinity,
                isStatic: true,
                collisionFilter: {
                    category: 0x0011,
                },
            }
        }
    },

    // trees: {
    //     props: {
    //     },
    //     // bodyRadius: 95,
    //     // bodyWidth: 30,
    //     // bodyHeight: 60
    // },

    // pickaxes: {
    //     props: {
    //     }
    // },
};


// cfg.trees.bodyOptions = {
//     inertia: Infinity,
//     isSensor: true,
//     isStatic: true,
//     collisionFilter: {
//         category: cfg.trees.props.category,
//     },
// };

// cfg.pickaxes.bodyOptions = {
//     inertia: Infinity, //prevents player rotation
//     isStatic: false,
//     isSensor: true,
//     collisionFilter: {
//         category: cfg.pickaxes.props.category,
//     },
// };


const config = {};
_.merge(config, configShared, cfg);
module.exports = config;

//cfg.player.bodyOptions.collisionFilter.mask = cfg.treeCategory | cfg.stoneCategory;
//cfg.tree.bodyOptions.collisionFilter.mask = cfg.item.pickaxeCategory;
//cfg.stoneMask = cfg.stoneCategory;

// friction: {
//             ground: 0.01,
//             // crouch: 0.2,
//             air: 0.0025
//         },
//         
// serverPort: process.env.PORT || 4000,
// serverUrl: 'piaf.io',

// tickMain: 50, //main loop - times in ms
// tickBoard: 10, //update board - this * tickMain
// tickPhysics: 15, //update physics - 66.6 FPS - like CS

// tickState: 20, //40 send state, each player - 50 FPS
// tickScope: 16, //scope = this * tickState - 3.125

// updateRate: 6, // number of steps in each update (sync)
// stepRate: 60, // number of steps per second
// timeoutInterval: 40, // number of seconds after which a player is automatically disconnected if no input is received. Set to 0 for no timeout
// updateOnObjectCreation: true, // should send update immediately when new object is created
// debug: {
//     serverSendLag: false
// },