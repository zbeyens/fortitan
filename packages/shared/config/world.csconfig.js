export const ENTITY_TYPES = [
  'players',
  'grounds',
  'trees',
  // 'items',
  'pickaxes',
];

export const WORLD_CS = {
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

  bounds: {
    width: 20480,
    height: 1024,
    scale: 0.9,
  },
};
