'use strict'

const path = require('path')
const slsw = require('serverless-webpack')
const webpack = require('webpack')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const babelLoader = {
  loader: 'babel-loader',
  options: {
    configFile: path.join(process.cwd(), 'babel.config.js')
  }
}

module.exports = {
  entry: slsw.lib.entries,
  target: 'node',
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  externals: [/^aws-sdk*/],
  stats: 'none',
  performance: {
    // Turn off size warnings for entry points
    hints: false
  },
  optimization: {
    namedModules: true,
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        terserOptions: {
          ecma: 8,
          mangle: false,
          keep_classnames: true,
          keep_fnames: true
        }
      })
    ]
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    symlinks: false,
    plugins: [
      new TsconfigPathsPlugin({
        configFile: path.join(process.cwd(), '../../tsconfig.json')
      })
    ]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules|.serverless|.webpack|.cache-loader/,
        use: [
          {
            loader: 'cache-loader',
            options: {
              cacheDirectory: path.join(process.cwd(), '../../.cache-loader/')
            }
          },
          babelLoader,
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              happyPackMode: true
            }
          }
        ]
      },
      {
        test: /\.jsx?$/,
        include: process.cwd(),
        exclude: /node_modules|.serverless|.webpack|.cache-loader/,
        use: [babelLoader]
      }
    ]
  },
  output: {
    libraryTarget: 'commonjs2',
    path: path.join(process.cwd(), '.webpack'),
    filename: '[name].js'
  },
  plugins: [new webpack.DefinePlugin({ 'global.GENTLY': false })]
}
