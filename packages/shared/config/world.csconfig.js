export const TYPES = {
  player: 'players',
  ground: 'grounds',
  tree: 'trees',
  pickaxe: 'pickaxes',
};

export const WORLD_CS = {
  x: 0,
  y: 0,
  width: 20480,
  height: 1024,
  scale: 0.9,

  tileSize: 128,

  players: {
    props: {
      // atlasIndex: 0,
    },
  },

  grounds: {
    tile: {
      position: {
        x: 0,
        y: 6,
      },
      width: 80,
      height: 1,
    },

    props: {
      imageIndex: 0,
      body: {},
    },
  },
  trees: {},
};
