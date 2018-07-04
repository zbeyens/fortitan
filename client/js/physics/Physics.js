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
        const engine = Matter.Engine.create();
        this.engine = engine;

        Matter.Engine.run(this.engine);

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

                if (!entityA || !entityB) return;

                if (entityA.props.category === ccfg.player.category && entityB.props.category === ccfg.player.category) {
                    // console.log('player with player collision started');
                } else if ((entityA.props.category === ccfg.player.category && entityB.props.category === ccfg.treeCategory) || (entityA.props.category === ccfg.treeCategory && entityB.props.category === ccfg.player.category)) {
                    // console.log('player with tree collision started');
                } else if ((entityA.props.category === ccfg.player.category && entityB.props.category === ccfg.stoneCategory) || (entityA.props.category === ccfg.Category && entityB.props.category === ccfg.player.category)) {
                    // console.log('player with stone collision started');
                } else {
                    console.log('mysterious collision started');
                }
            });
        });

        Matter.Events.on(this.engine, 'collisionActive', (event) => {
            event.pairs.forEach((pair) => {
                const entityA = pair.bodyA.parent.entity;
                const entityB = pair.bodyB.parent.entity;

                if (!entityA || !entityB) return;


                if (entityA.props.category === ccfg.player.category && entityB.props.category === ccfg.player.category) {
                    // console.log('player with player collision going on');
                } else if ((entityA.props.category === ccfg.player.category && entityB.props.category === ccfg.treeCategory) || (entityA.props.category === ccfg.treeCategory && entityB.props.category === ccfg.player.category)) {
                    // console.log('player with tree collision going on');
                } else if ((entityA.props.category === ccfg.player.category && entityB.props.category === ccfg.Category) || (entityA.props.category === ccfg.Category && entityB.props.category === ccfg.player.category)) {
                    // console.log('player with stone collision going on');
                } else {
                    console.log('mysterious collision going on');
                }
            });
        });

        Matter.Events.on(this.engine, 'collisionEnd', (event) => {
            event.pairs.forEach((pair) => {
                const entityA = pair.bodyA.parent.entity;
                const entityB = pair.bodyB.parent.entity;

                if (!entityA || !entityB) return;


                if (entityA.props.category === ccfg.player.category && entityB.props.category === ccfg.player.category) {
                    // console.log('player with player collision ended');
                } else if ((entityA.props.category === ccfg.player.category && entityB.props.category === ccfg.treeCategory) || (entityA.props.category === ccfg.treeCategory && entityB.props.category === ccfg.player.category)) {
                    // console.log('player with tree collision ended');
                } else if ((entityA.props.category === ccfg.player.category && entityB.props.category === ccfg.Category) || (entityA.props.category === ccfg.Category && entityB.props.category === ccfg.player.category)) {
                    // console.log('player with stone collision ended');
                } else {
                    console.log('mysterious collision ended');
                }
            });
        });
    }

    

    update(selfPlayer) {
        if (this.render) {
            this.render.bounds.min.x = -this.render.options.width / 2 + selfPlayer.state.x;
            this.render.bounds.max.x = this.render.options.width / 2 + selfPlayer.state.x;
            this.render.bounds.min.y = -this.render.options.height / 2 + selfPlayer.state.y;
            this.render.bounds.max.y = this.render.options.height / 2 + selfPlayer.state.y;
        }
    }
}