const config = {
	category: 0x0100,
    bodyWidth: 50,
    bodyHeight: 40,
    pickaxeCategory: 0x0101
};

config.bodyOptions = {
    inertia: Infinity, //prevents player rotation
    // friction: 0.002, 
    // friction: 0, 
    // frictionAir: 0,
    isStatic: false,
    isSensor: true,
    collisionFilter: {
        // group
        category: config.category,
    },
};

module.exports = config;