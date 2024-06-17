const preprocessor = require('@cypress/webpack-preprocessor');
module.exports = (on, config) => {
  const webpack = require('./webpack.config.js');
  on("file:preprocessor", preprocessor({ webpack }));
  return config;
};
