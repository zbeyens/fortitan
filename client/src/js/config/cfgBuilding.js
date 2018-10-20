const config = {

    //props of each type of entity
    category: 0x0012,
    thickness: 10,
    length: 150,

    offsetX: 0,
    offsetY: 100,

    // keyWalk: 'p1_walk',
    // urlWalk: 'client/img/temp/p3_walk/p3_walk',
};


config.bodyOptions = {
    inertia: Infinity,
    isStatic: false,
    isSensor: true,
    collisionFilter: {
        category: config.category,
    },
}

module.exports = config;