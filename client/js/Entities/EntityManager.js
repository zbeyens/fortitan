/**
 * Handle the entities
 */
export default class EntityManager {
    constructor() {
        this.entities = [];

        this.idCounter = 0;
    }

    /**
     * Add the new entity
     * @param {Entity} entity added
     */
    add(entity) {
        this.entities.push(entity);
    }

    /**
     * Update all the entities
     */
    update(delta) {
    	for (let i = this.entities.length - 1; i >= 0; i--) {
            const entity = this.entities[i];
            entity.update(delta);
        }
    }

    /**
     * Find the entity with the param id and remove it
     * @param  {int} id of the entity to remove
     */
    remove(id) {
        for (let i = this.entities.length - 1; i >= 0; i--) {
            if (this.entities[i].id === id) {
                this.entities.splice(i, 1);
            }
        }
    }
}