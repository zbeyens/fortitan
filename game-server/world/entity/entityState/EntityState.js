/**
 * State contains the mutable attributes (not constants)
 * Every entity has a position
 * Entity may be needed to know the id or the props to modifiy the state 
 * Physics happens here for the moment
 */
export default class EntityState {
    constructor(entity, { x, y }) {
        this.entity = entity;

        this.position = { x, y };
    }
}