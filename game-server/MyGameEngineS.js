import MyPhysicsEngine from './physics/MyPhysicsEngine';
import MyGameEngine from '../shared/MyGameEngine';
import EntityFactory from './world/entity/EntityFactory';
import cfg from './config';


export default class MyGameEngineS extends MyGameEngine {

    constructor() {
        super();

        this.physicsEngine = new MyPhysicsEngine(this);
        this.entityFactory = new EntityFactory(this);
    }

    start() {
        super.start();

        this.createLevel();
    }

    processInput(inputData, socketId) {
        super.processInput(inputData, socketId);

        // find the player entity with the socketId
        let player;
        for (const id of Object.keys(this.world.entities.players)) {
            const p = this.world.entities.players[id];
            if (p.socketId === socketId)
                player = p;
        }

        if (player) {
            player.handleInput(inputData);
        }
    }

    step(t, dt) {
        this.physicsEngine.step(t, dt);

        super.step(t, dt);
    }

    /**
     * Creates a new player, adds it to the game world
     * TODO: we can place it randomly and set the props from the user input
     */
    createPlayer() {
        const type = 'players';

        const state = cfg[type].state;
        const props = cfg[type].props;

        const entity = {
            state,
            props
        };

        const newEntity = this.addEntity(type, entity);
        return newEntity;
    }

    

}

// registerClasses(serializer){
//     serializer.registerClass(Ship);
//     serializer.registerClass(Missile);
// }

// makeMissile(playerShip, inputId) {
//     let missile = new Missile(this);

//     // we want the missile location and velocity to correspond to that of the ship firing it
//     missile.position.copy(playerShip.position);
//     missile.velocity.copy(playerShip.velocity);
//     missile.angle = playerShip.angle;
//     missile.playerId = playerShip.playerId;
//     missile.ownerId = playerShip.id;
//     missile.inputId = inputId; // this enables usage of the missile shadow object
//     missile.velocity.x += Math.cos(missile.angle * (Math.PI / 180)) * 10;
//     missile.velocity.y += Math.sin(missile.angle * (Math.PI / 180)) * 10;

//     this.trace.trace(() => `missile[${missile.id}] created vel=${missile.velocity}`);

//     let obj = this.addEntityToWorld(missile);

//     // if the object was added successfully to the game world, destroy the missile after some game ticks
//     if (obj)
//         this.timer.add(30, this.destroyMissile, this, [obj.id]);

//     return missile;
// }

// destroy the missile if it still exists
// destroyMissile(missileId) {
//     if (this.world.entities[missileId]) {
//         this.trace.trace(() => `missile[${missileId}] destroyed`);
//         this.removeEntityFromWorld(missileId);
//     }
// }