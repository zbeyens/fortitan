const _ = require('lodash');
const configShared = require('../../shared/config');

const categories = {
  default: 1,
  players: 2,
  resources: 4,
  grounds: 8,
  pickaxes: 16,
};

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
        y: 0,
      },
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
        collisionFilter: {
          category: categories.players,
          group: 1,
          mask: categories.players | categories.grounds,
        },
      },
    },
  },

  grounds: {
    body: {
      options: {
        inertia: Infinity,
        isStatic: true,
        collisionFilter: {
          category: categories.grounds | categories.players,
        },
      },
    },
  },
  trees: {
    amount: 10,
    body: {
      radius: 110,
      options: {
        inertia: Infinity,
        isSensor: true,
        collisionFilter: {
          category: categories.resources,
          mask: categories.resources | categories.pickaxes,
        },
      },
    },
  },

  pickaxes: {
    idleAngle: -Math.PI / 6,
    useAngleFactor: 0.0015,
    useTime: 500,
    offsetRadius: 50,
    body: {
      radius: 15,
      options: {
        inertia: Infinity,
        isSensor: true,
        collisionFilter: {
          category: categories.pickaxes,
          mask: categories.pickaxes | categories.resources,
        },
      },
    },
  },
  inventory: {
    limit: 10,
  },
};

const config = {};
_.merge(config, configShared, cfg);
module.exports = config;

// serverPort: process.env.PORT || 4000,
// serverUrl: 'piaf.io',

// tickMain: 50, main loop - times in ms
// tickBoard: 10, update board - this * tickMain
// tickPhysics: 15, update physics - 66.6 FPS - like CS

// tickState: 20, 40 send state, each player - 50 FPS
// tickScope: 16, scope = this * tickState - 3.125

// updateRate: 6,  number of steps in each update (sync)
// stepRate: 60,  number of steps per second
// timeoutInterval: 40,  number of seconds after which a player is automatically disconnected if no input is received. Set to 0 for no timeout
// updateOnObjectCreation: true,  should send update immediately when new object is created
// debug: {
//     serverSendLag: false
// },
