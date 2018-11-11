/**
 * Entity is the base class of all game entities.
 * It is created only for the purpose of clearly defining the entity interface.
 * Game developers will use one of the subclasses such as DynamicEntity, or StaticEntity.
 * Every Entity is an object of the world of the server/client.
 */
export default class Entity {

    constructor(id) {
        this.id = id;
        this.state = {
            position: {
                x: 0,
                y: 0,
            }
        };
        this.props = {};
    }

    update(dt) {}

    // convenience getters
    get x() { return this.state.position.x; }

    get y() { return this.state.position.y; }

}