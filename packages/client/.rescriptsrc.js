const webpack = require('webpack');
const path = require('path');

module.exports = [
  config => {
    return config;
  },
  [
    'use-babel-config',
    {
      presets: ['react-app'],
      plugins: [
        [
          'babel-plugin-named-asset-import',
          {
            loaderMap: {
              svg: {
                ReactComponent: '@svgr/webpack?-svgo,+ref![path]',
              },
            },
          },
        ],
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        ['@babel/plugin-proposal-class-properties', { loose: true }],
      ],
    },
  ],
];
