const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

const cssLoaders = () => {
  const loaders = [];

  loaders.push(isDev ? 'style-loader' : MiniCssExtractPlugin.loader);

  loaders.push({
    loader: 'css-loader',
    options: {
      modules: {
        localIdentName: `${isDev ? '[folder]_[local]_' : ''}[hash:base64:6]`,
      },
      importLoaders: 1,
    },
  });
  loaders.push('postcss-loader');

  return loaders
};

const getFilename = ext => `[name].[hash:8].${ext}`;

const fileLoader = (folder) => {
  const filenamePrefix = isDev ? '[name].' : '';
  return ({
    loader: 'file-loader',
    options: {
      name: `assets/${folder}/${filenamePrefix}[contentHash:8].[ext]`,
    },
  });
};

module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: {
    bundle: './src/index.js',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  output: {
    filename: getFilename('js'),
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
        collapseWhitespace: isProd,
      },
    }),
    new MiniCssExtractPlugin({
      filename: getFilename('css'),
    }),
    new webpack.EnvironmentPlugin(['NODE_ENV']),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
          'eslint-loader',
        ],
      },
      {
        test: /\.p?css$/,
        use: cssLoaders(),
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: [fileLoader('images')],
      },
      {
        test: /\.(ttf|eot|wotf|wotf2)$/,
        use: [fileLoader('fonts')],
      },
    ],
  },
};
