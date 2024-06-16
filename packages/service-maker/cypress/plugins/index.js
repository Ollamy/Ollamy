const webpack = require('@cypress/webpack-preprocessor');
const path = require('path');

module.exports = (on) => {
  const webpackConfig = require(path.resolve(__dirname, '../../webpack.config.cjs'));
  const options = {
    webpackOptions: webpackConfig,
  };

  on('file:preprocessor', webpack(options));
};
