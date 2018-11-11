import MyGameEngineV from './MyGameEngineV';
import MyClientEngine from './MyClientEngine';


// create a client engine and a game engine
const gameEngine = new MyGameEngineV();
const clientEngine = new MyClientEngine(gameEngine);

clientEngine.start();