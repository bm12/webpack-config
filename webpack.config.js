const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

const cssLoaders = () => {
  const loaders = [];

  if (isDev) {
    loaders.push('style-loader')
  } else {
    loaders.push({
      loader: MiniCssExtractPlugin.loader,
      options: {
        hmr: isDev,
      },
    });
  }

  loaders.push('css-loader');

  return loaders
};

module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: {
    bundle: './src/index.js'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  output: {
    filename: '[name].[hash:8].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  devServer: {
    port: 3000,
    contentBase: path.resolve(__dirname, 'static'),
    watchContentBase: true,
    hot: isDev,
    open: true,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: './static/index.html',
      filename: path.resolve(__dirname, 'dist', 'index.html'),
      minify: {
        collapseWhitespace: true,
      }
    }),
    new MiniCssExtractPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: cssLoaders(),
      },
    ],
  },
};
