var webpack = require('webpack');

module.exports = {
  entry: ['./src/index.jsx'],
  output: {
    path: __dirname + "/dist/js",
    filename: "app.bundle.js"
  },
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    })
  ],
  module: {
    loaders: [
      { test: /\.css$/, loaders: ['style-loader', 'css-loader'], include: __dirname },
      { test: /\.json$/, loader: 'json' },
      { test: /\.jsx?$/, loaders: ['babel-loader'], exclude: /node_modules/, include: __dirname }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
};
