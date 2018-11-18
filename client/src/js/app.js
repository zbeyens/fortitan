import MyGameEngineV from './MyGameEngineV';
import MyClientEngine from './MyClientEngine';
import FakeClientEngine from './FakeClientEngine';
import cfg from './config';


// create a client engine and a game engine
const gameEngine = new MyGameEngineV();

let clientEngine;

if (cfg.debug.fakeServer) {
	clientEngine = new FakeClientEngine(gameEngine);
} else {
	clientEngine = new MyClientEngine(gameEngine);
}

clientEngine.start();