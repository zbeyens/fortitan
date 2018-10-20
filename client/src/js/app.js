import MyGameEngineV from './MyGameEngineV'
import MyClientEngine from './MyClientEngine'

// create a client engine and a game engine
const gameEngine = new MyGameEngineV();
const clientEngine = new MyClientEngine(gameEngine);

clientEngine.start();


// window.onload = () => {

// };
// window.onresize = function () {
//     game.renderer.resize(window.innerWidth, window.innerHeight, 1.0);
// }