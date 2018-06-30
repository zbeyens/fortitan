import Tree from './Tree';
import EntityManager from '../../EntityManager';

export default class TreeManager extends EntityManager {

    add({ id, state, props, engine }) {
        super.add(new Tree({ id, state, props, engine }));
    }
}
