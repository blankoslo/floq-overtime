const webpack = require('webpack');

const port = process.env.PORT || 8080;

module.exports = {
  entry: [
    `webpack-dev-server/client?http://localhost:${port}`,
    'webpack/hot/only-dev-server',
    './src/index.jsx'
  ],
  output: {
    path: __dirname + '/dist/js',
    publicPath: '/dist/js/',
    filename: 'app.bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devtool: 'source-map',
  module: {
    loaders: [
      { test: /\.css$/, loaders: ['style-loader', 'css-loader'], include: __dirname } ,
      { test: /\.json$/, loader: 'json' },
      { test: /\.jsx?$/, loaders: ['react-hot-loader', 'babel-loader'], exclude: /node_modules/, include: __dirname }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
};