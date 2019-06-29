/* eslint-disable no-bitwise */
export const BODY_CATEGORIES = {
  default: 1,
  players: 2,
  resources: 4,
  grounds: 8,
  pickaxes: 16,
};

export const BODY_ENTITIES = {
  players: {
    speed: 5,
    jumpForce: -13,

    hittingCd: 500,
    hittingRayWidth: 10,
    hittingRayRange: 100,

    state: {
      position: {
        x: 300,
        y: 300,
      },
      direction: {
        x: 0,
        y: 0,
      },
    },

    body: {
      width: 72,
      height: 90,
      options: {
        inertia: Infinity, // prevents player rotation
        // friction: 0.002,
        // friction: 0,
        // frictionAir: 0,
        isStatic: false,
        collisionFilter: {
          category: BODY_CATEGORIES.players,
          group: 1,
          mask: BODY_CATEGORIES.players | BODY_CATEGORIES.grounds,
        },
      },
    },
  },

  grounds: {
    body: {
      options: {
        inertia: Infinity,
        isStatic: true,
        collisionFilter: {
          category: BODY_CATEGORIES.grounds | BODY_CATEGORIES.players,
        },
      },
    },
  },
  trees: {
    amount: 10,
    body: {
      radius: 110,
      options: {
        inertia: Infinity,
        isSensor: true,
        collisionFilter: {
          category: BODY_CATEGORIES.resources,
          mask: BODY_CATEGORIES.resources | BODY_CATEGORIES.pickaxes,
        },
      },
    },
  },

  pickaxes: {
    idleAngle: -Math.PI / 6,
    useAngleFactor: 0.0015,
    useTime: 500,
    offsetRadius: 50,
    body: {
      radius: 15,
      options: {
        inertia: Infinity,
        isSensor: true,
        collisionFilter: {
          category: BODY_CATEGORIES.pickaxes,
          mask: BODY_CATEGORIES.pickaxes | BODY_CATEGORIES.resources,
        },
      },
    },
  },
  inventory: {
    limit: 10,
  },
};
