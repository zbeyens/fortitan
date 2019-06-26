import dat from 'dat.gui';

export const gui = new dat.GUI();

export const DEBUG = {
  stats: {
    on: 1,
    top: '0',
    left: '0%',
  },

  pointer: 0,

  camera: 1, // Render camera information including dimensions and location.
  camPosition: 1,
  camZoom: 1,
  camRotation: 0,
  camHelp: 0,

  inputInfo: 0, // Render debug information about the Input object.
  scale: 0, // Prints game/canvas dimensions and game scale settings.
};
