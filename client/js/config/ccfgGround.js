const config = {

    //props of each type of entity
    category: 0x0011,
    width: 5000,
    height: 200,

    // keyWalk: 'p1_walk',
    // urlWalk: 'client/img/temp/p3_walk/p3_walk',
};


config.bodyOptions = {
    inertia: Infinity,
    isStatic: true,
    collisionFilter: {
        category: config.category,
    },
}

module.exports = config;