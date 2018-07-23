import Matter from 'matter-js';
import ccfg from '../config';

export default class Physics {

    constructor() {
        this.initEngine();
        this.initRenderer();
        this.handleCollisions();

        //const ground = Matter.Bodies.rectangle(75, 75, 150, 150, { isStatic: true }); PAS DE TOOOO BAAAD
        // add all of the bodies to the world
        //Matter.World.add(this.engine.world, [ground]);
    }

    //initEngine : loop 60 times per sec and checks physics each time
    initEngine() {
        // create an engine
        this.engine = Matter.Engine.create();

        // Matter.Engine.run(this.engine);

        // engine.enableSleeping = true;
        // engine.world.gravity.x = 0;
        // engine.world.gravity.y = 1;
    }

    //Debugger
    initRenderer() {
        const engine = this.engine;
        // create a renderer
        this.render = Matter.Render.create({
            element: document.body,
            engine: engine,
            options: {
                width: 800,
                height: 600,
                hasBounds: true,
                showAxes: true,
                showCollisions: true,
                showConvexHulls: true
            }
        });
        Matter.Render.run(this.render);
    }

    handleCollisions() {
        Matter.Events.on(this.engine, "collisionStart", (event) => {
            event.pairs.forEach((pair) => {
                const entityA = pair.bodyA.parent.entity;
                const entityB = pair.bodyB.parent.entity;

                console.log("coucou2");

                if (!entityA || !entityB) return;

                this.checkPlayerOnGround(entityA, entityB);
                
                this.checkPickaxeTreeCollisions(entityA, entityB);


                if (this.checkCategory(entityA.props.category, entityB.props.category, ccfg.player.category, ccfg.player.category)) {
                    // console.log('player with player collision started');
                } else if (this.checkCategory(entityA.props.category, entityB.props.category, ccfg.player.category, ccfg.treeCategory)) {
                    // console.log('player with tree collision started');
                }
            });
        });

        Matter.Events.on(this.engine, 'collisionActive', (event) => {
            event.pairs.forEach((pair) => {
                const entityA = pair.bodyA.parent.entity;
                const entityB = pair.bodyB.parent.entity;

                if (!entityA || !entityB) return;


                if (this.checkCategory(entityA.props.category, entityB.props.category, ccfg.player.category, ccfg.player.category)) {
                    // console.log('player with player collision going on');
                } else if (this.checkCategory(entityA.props.category, entityB.props.category, ccfg.player.category, ccfg.treeCategory)) {
                    // console.log('player with tree collision going on');
                }
            });
        });

        Matter.Events.on(this.engine, 'collisionEnd', (event) => {
            event.pairs.forEach((pair) => {
                const entityA = pair.bodyA.parent.entity;
                const entityB = pair.bodyB.parent.entity;

                if (!entityA || !entityB) return;

                this.checkPlayerOffGround(entityA, entityB);	

                if (this.checkCategory(entityA.props.category, entityB.props.category, ccfg.player.category, ccfg.player.category)) {
                    // console.log('player with player collision ended');
                } else if (this.checkCategory(entityA.props.category, entityB.props.category, ccfg.player.category, ccfg.treeCategory)) {
                    // console.log('player with tree collision ended');
                }
            });
        });
    }

    checkPlayerOnGround(entityA, entityB) {

        const res = this.checkCategory(entityA.props.category, entityB.props.category, ccfg.player.category, ccfg.ground.category);
        if (!res) return;
       
        let player;
        if (res === 1) {
            player = entityA;
        } else if (res === 2) {
            player = entityB;
        }
        player.state.enterLand();

    }
    checkPlayerOffGround(entityA, entityB) {
        const res = this.checkCategory(entityA.props.category, entityB.props.category, ccfg.player.category, ccfg.ground.category);
        if (!res) return;
       
        let player;
        if (res === 1) {
            player = entityA;
        } else if (res === 2) {
            player = entityB;
        }
        player.state.exitLand();

    }
    checkCategory(categoryA, categoryB, category1, category2) {
        if ((categoryA === category1 && categoryB === category2)) {
            return 1;
        }
        if ((categoryB === category1 && categoryA === category2)) {
            return 2;
        }
    }

    /**
     * Use raycasting to check collisions
     * Raycasting create a rectangle between startPoint and endPoint
     * and check collisions with all the bodies.
     * If there is a collision with self, ignore.
     * If already hit one entity, ignore.
     * Else, add the hit entity in this.hit and handle the collision. 
     */
    checkPickaxeTreeCollisions(entityA, entityB) {
        console.log(entityA.props.category);
        console.log(entityB.props.category);
        const res = this.checkCategory(entityA.props.category, entityB.props.category, ccfg.item.pickaxeCategory, ccfg.tree.category);
        console.log("coucou");
         if (!res) return;
       
        let player;
        let tree;

        

        //check which entity is the player
        if (res === 1) {
            player = entityA;
            tree = entityB;
            console.log("Collision between pickaxe and tree");
        } else if (res === 2) {
            player = entityB;
            tree = entityA;
            console.log("Collision between tree and pickaxe");
        }
        //tree.state.
        //player.state.cutTree();
    }

    update(delta, selfPlayer) {
        // if delta is too high, physics system is broken
        if (delta > 100) return;

        Matter.Engine.update(this.engine, delta);

        if (this.render) {
            this.render.bounds.min.x = -this.render.options.width / 2 + selfPlayer.state.x;
            this.render.bounds.max.x = this.render.options.width / 2 + selfPlayer.state.x;
            this.render.bounds.min.y = -this.render.options.height / 2 + selfPlayer.state.y;
            this.render.bounds.max.y = this.render.options.height / 2 + selfPlayer.state.y;
        }
    }
}