const config = {

    //props of each type of entity
    category: 0x0010,
    bodyRadius: 95,
    bodyWidth: 30,
    bodyHeight: 60
    // keyWalk: 'p1_walk',
    // urlWalk: 'client/img/temp/p3_walk/p3_walk',
};


config.bodyOptions = {
    inertia: Infinity,
    isSensor: true,
    isStatic: true,
    collisionFilter: {
        category: config.category,
    },
};

module.exports = config;