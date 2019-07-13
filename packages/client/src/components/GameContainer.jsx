import React, { useEffect } from 'react';
import { PARENT_DIV_TAG } from 'config/phaser.config';
import GameClient from 'game/Game.client';

const GameContainer = ({ clientEngine }) => {
  useEffect(() => {
    // mock the socket.io
    const ioMock = {
      emit: () => {},
      on: () => {},
      in: () => {},
      connected: 'connected',
    };

    GameClient(ioMock, clientEngine);
    //   var canvas = document.getElementById('game');
    // var windowWidth = window.innerWidth;
    // var windowHeight = window.innerHeight;
    // var windowRatio = windowWidth / windowHeight;
    // var gameRatio = game.config.width / game.config.height;
    // if (windowRatio < gameRatio) {
    //   canvas.style.width = windowWidth + 'px';
    //   canvas.style.height = (windowWidth / gameRatio) + 'px';
    // }
    // else {
    //   canvas.style.width = (windowHeight * gameRatio) + 'px';
    //   canvas.style.height = windowHeight + 'px';
    // }
  }, [clientEngine]);

  return <div id={PARENT_DIV_TAG} />;
};

export default GameContainer;
