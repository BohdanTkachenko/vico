import ExtractTextPlugin from 'extract-text-webpack-plugin';
import packageJSON from './package.json';

const externals = {};
for (const name of Object.keys(packageJSON.dependencies)) {
  externals[name] = true;
}

export default {
  target: 'web',
  entry: {
    writer: './src/lib.js',
  },
  output: {
    path: './dist',
    filename: '[name].js',
    library: 'ReactWriter',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  externals,
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
