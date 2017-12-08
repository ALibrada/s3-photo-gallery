const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');

const port = 8080;
const path = require('path');

const options = {
  publicPath: config.output.publicPath,
  hot: true,
  inline: true,
  stats: { colors: true }
};

const server = new WebpackDevServer(webpack(config), options);

server.listen(port, 'localhost', function (err) {
  if (err) {
    console.log(err);
  }
  console.log('WebpackDevServer listening at localhost:', port);
});