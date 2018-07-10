const config = {

    Fx: 0.025, //run Force on ground
    FxAir: 0.015, //run Force in Air
    jumpForce: -0.3,
    gravity: 0.0019,
    friction: {
        ground: 0.01,
        // crouch: 0.2,
        air: 0.0025
    },


    //props of each type of entity
    category: 0x0001,
    bodyWidth: 72,
    bodyHeight: 90,
    speed: 5,
    hittingCd: 500,
    hittingRayWidth: 10,
    hittingRayRange: 100,

    keyPlayer1: 'p1',
    urlPlayer1: 'client/img/temp/p1',
    keyWalk: 'p1_walk',
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