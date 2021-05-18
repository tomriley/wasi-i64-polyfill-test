const path = require('path');
var webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: './example-wasi.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    library: "Example"
  },
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    })
  ]
};
