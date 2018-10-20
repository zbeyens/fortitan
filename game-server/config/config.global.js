const config = module.exports = {
    serverPort: process.env.PORT || 4000,
    serverUrl: 'piaf.io',

    tickMain: 50, //main loop - times in ms
    tickBoard: 10, //update board - this * tickMain
    tickPhysics: 15, //update physics - 66.6 FPS - like CS

    tickState: 20, //40 send state, each player - 50 FPS
    tickScope: 16, //scope = this * tickState - 3.125

    updateRate: 6, // number of steps in each update (sync)
    stepRate: 60, // number of steps per second
    timeoutInterval: 40, // number of seconds after which a player is automatically disconnected if no input is received. Set to 0 for no timeout
    updateOnObjectCreation: true, // should send update immediately when new object is created
    debug: {
        serverSendLag: false
    }


};

config.players = {
    Fx: 0.025, //run Force on ground
    FxAir: 0.015, //run Force in Air
    jumpForce: -0.03,
    gravity: 0.0019,
    friction: {
        ground: 0.01,
        // crouch: 0.2,
        air: 0.0025
    },


    bodyWidth: 72,
    bodyHeight: 90,
    speed: 5,
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

    props: {
        category: 0x0001,
        texture: 'p1_walk',
    }
};

config.players.bodyOptions = {
    inertia: Infinity, //prevents player rotation
    // friction: 0.002, 
    // friction: 0, 
    // frictionAir: 0,
    isStatic: false,
    // collisionFilter: {
    //     // group
    //     category: config.category,
    // },
};

config.grounds = {
    props: {
        category: 0x0011,
    }
};

config.grounds.bodyOptions = {
    inertia: Infinity,
    isStatic: true,
    collisionFilter: {
        category: config.grounds.props.category,
    },
}

config.trees = {
    props: {
        category: 0x0010,
    },
    // bodyRadius: 95,
    // bodyWidth: 30,
    // bodyHeight: 60
};

config.trees.bodyOptions = {
    inertia: Infinity,
    isSensor: true,
    isStatic: true,
    collisionFilter: {
        category: config.trees.props.category,
    },
};

config.pickaxes = {
    props: {
        category: 0x0100
    }
};

config.pickaxes.bodyOptions = {
    inertia: Infinity, //prevents player rotation
    isStatic: false,
    isSensor: true,
    collisionFilter: {
        category: config.pickaxes.props.category,
    },
};

//config.player.bodyOptions.collisionFilter.mask = config.treeCategory | config.stoneCategory;
//config.tree.bodyOptions.collisionFilter.mask = config.item.pickaxeCategory;
//config.stoneMask = config.stoneCategory;