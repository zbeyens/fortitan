module.exports = {
    serverPort: process.env.PORT || 4000,
    serverUrl: 'piaf.io',
    
    tickMain: 50, //main loop - times in ms
    tickBoard: 10, //update board - this * tickMain
    tickPhysics: 15, //update physics - 66.6 FPS - like CS
    
    tickState: 20, //40 send state, each player - 50 FPS
    tickScope: 16, //scope = this * tickState - 3.125
};