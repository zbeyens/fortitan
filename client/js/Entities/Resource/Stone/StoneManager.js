import Stone from './Stone';
import EntityManager from '../../EntityManager';

export default class StoneManager extends EntityManager {

    add({ id, state, props }) {
        super.add(new Stone({ id, state, props }));
    }
}
