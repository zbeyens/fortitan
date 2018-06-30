import Entity from '../Entity';
import ResourceProps from './ResourceProps';
import ResourceState from './ResourceState';
import ResourceView from './ResourceView';

/**
 * A resource is ...
 */
export default class Resource extends Entity {
    constructor({ id, state, props }) {
        super(id);
    }

}