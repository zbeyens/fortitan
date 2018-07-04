const config = {

    Fx: 0.025, //run Force on ground
    FxAir: 0.015, //run Force in Air
    jumpForce: 0.38,
    gravity: 0.0019,
    friction: {
        ground: 0.01,
        // crouch: 0.2,
        air: 0.0025
    },


    //props of each type of entity
    category: 0x0001,
    bodyRadius: 64,
    speed: 5,
    hittingCd: 500,
    hittingRayWidth: 10,
    hittingRayRange: 100,

    keyWalk: 'p1_walk',
    urlWalk: 'client/img/temp/p3_walk/p3_walk',
};


config.bodyOptions = {
    inertia: Infinity, //prevents player rotation
    // friction: 0.002, 
    // friction: 0, 
    // frictionAir: 0,
    isStatic: false,
    collisionFilter: {
        // group
        category: config.category,
    },
}

module.exports = config;