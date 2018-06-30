import Player from './Player';
import EntityManager from '../EntityManager';

export default class PlayerManager extends EntityManager {

    add({ id, state, props, engine }) {
        super.add(new Player({ id, state, props, engine }));
    }
}