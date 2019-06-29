import React, { useEffect } from 'react';
import { PARENT_DIV_TAG } from 'config/phaser.config';
import PhaserGame from 'game/PhaserGame';

const GameContainer = ({ clientEngine }) => {
  useEffect(() => {
    new PhaserGame(clientEngine);
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
