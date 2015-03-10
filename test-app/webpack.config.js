module.exports = {
  cache: true,
  entry: './index.jsx',
  output: {
    filename: 'browser-bundle.js'
  },
  module: {
    loaders: [
      {test: /\.jsx/, loader: 'jsx-loader'}
    ]
  }
};
