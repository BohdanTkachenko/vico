import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
  target: 'web',
  entry: {
    demo: './demo/demo.jsx',
  },
  output: {
    path: './demo',
    filename: '[name].js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel-loader'],
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader'),
      },
    ],
  },
  resolve: {
    extensions: ['', '.json', '.js', '.jsx'],
  },
  plugins: [
    new ExtractTextPlugin('[name].css'),
  ],
};
