/**
 * This class represents an instance of the game world,
 * where all data of the current state of the world is saved.
 * The Game Engine includes a reference to the Game World, 
 * which consists of the game state, and a collection of entities. 
 * The Game World is essentially the data which is liable to change from one game step to the next, 
 * and whose changes must be sent on every sync to every client.
 *
 * The entities are instances of Entity base classes. 
 * There are two supported base object classes: DynamicEntity and StaticEntity. 
 * DynamicEntity is used for entities with a state that is variable (e.g. Player). 
 * These entities are serializable, and can be sent over a network.
 * StaticEntity is used for entities with a state that remains constant (e.g. Ground).
 * Thus, we say that these entities are "user-controlled" by a client.
 * These entities should not be sent over a network, since the client information is always up-to-date.
 */
export default class GameWorld {

    /**
     * Constructor of the World instance
     */
    constructor() {
        this.stepCount = 0;
        this.entities = {};
        this.idCount = {};
    }

    /**
     * Gets a new, fresh and unused id that can be used for a new entity
     * Use case: entities are sent to the client with an id.
     * Then, id is used to identify the entity later for update or delete.
     * @return {Number} the new id
     */
    getNewId(type) {
        let possibleId = this.idCount[type];
        // find a free id (we can spare this check)
        while (possibleId in this.entities[type])
            possibleId++;

        this.idCount[type] = possibleId + 1;

        return possibleId;
    }

    addEntityType(type) {
        this.entities[type] = {};
        this.idCount[type] = 0;
    }

    /**
     * Add an entity to the game world
     * @param {Entity} entity entity to add
     */
    addEntity(type, entity) {
        this.entities[type][entity.id] = entity;
    }

    /**
     * Remove an entity from the game world
     * @param {number} id id of the entity to remove
     */
    removeEntity(type, id) {
        delete this.entities[type][id];
    }
    
}

/**
     * World object iterator.
     * Invoke callback(objId, obj) for each object
     *
     * @param {function} callback function receives id and object. If callback returns false, the iteration will cease
     */
    // forEachObject(callback) {
    //     for (let id of Object.keys(this.entities)) {
    //         let returnValue = callback(id, this.entities[id]); // TODO: the key should be Number(id)
    //         if (returnValue === false) break;
    //     }
    // }

//  * Add the new entity
//  * @param {Entity} entity added
//  */
// add(entity) {
//     this.entities.push(entity);
// }

// /**
//  * Update all the entities
//  */
// update(delta) {
//     for (let i = this.entities.length - 1; i >= 0; i--) {
//         const entity = this.entities[i];
//         entity.update(delta);
//     }
// }

// /**
//  * Find the entity with the param id and remove it
//  * @param  {int} id of the entity to remove
//  */
// remove(id) {
//     for (let i = this.entities.length - 1; i >= 0; i--) {
//         if (this.entities[i].id === id) {
//             this.entities.splice(i, 1);
//         }
//     }
// }
// 
/**
     * Returns all the game world objects which match a criteria
     * @param {Object} query The query object
     * @param {Object} [query.id] object id
     * @param {Object} [query.playerId] player id
     * @param {Class} [query.instanceType] matches whether `object instanceof instanceType`
     * @param {Array} [query.components] An array of component names
     * @param {Boolean} [query.returnSingle] Return the first object matched
     * @returns {Array | Object} All game objects which match all the query parameters, or the first match if returnSingle was specified
     */
    // queryObjects(query) {
    //     let queriedObjects = [];

    //     // todo this is currently a somewhat inefficient implementation for API testing purposes.
    //     // It should be implemented with cached dictionaries like in nano-ecs
    //     this.forEachObject((id, object) => {
    //         let conditions = [];

    //         // object id condition
    //         conditions.push(!('id' in query) || query.id !== null && object.id === query.id);

    //         // player id condition
    //         conditions.push(!('playerId' in query) || query.playerId !== null && object.playerId === query.playerId);

    //         // instance type conditio
    //         conditions.push(!('instanceType' in query) || query.instanceType !== null && object instanceof query.instanceType);

    //         // components conditions
    //         if ('components' in query) {
    //             query.components.forEach(componentClass => {
    //                 conditions.push(object.hasComponent(componentClass));
    //             });
    //         }

    //         // all conditions are true, object is qualified for the query
    //         if (conditions.every(value => value)) {
    //             queriedObjects.push(object);
    //             if (query.returnSingle) return false;
    //         }
    //     });

    //     // return a single object or null
    //     if (query.returnSingle) {
    //         return queriedObjects.length > 0 ? queriedObjects[0] : null;
    //     }

    //     return queriedObjects;
    // }

    /**
     * Returns The first game object encountered which matches a criteria.
     * Syntactic sugar for {@link queryObject} with `returnSingle: true`
     * @param query See queryObjects
     * @returns {Object}
     */
    // queryObject(query) {
    //     return this.queryObjects(Object.assign(query, {
    //         returnSingle: true
    //     }));
    // }