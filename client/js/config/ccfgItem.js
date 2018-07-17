const config = {
	category: 0x0100,
    bodyWidth: 100,
    bodyHeight: 120,
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
}

module.exports = config;