'use strict';

let path = require('path');

module.exports = {
  mode: 'production', // финальная сборка
  // mode: 'development',
  entry: './js/script.js',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/js'
  },
  watch: true,

  devtool: "source-map",

  module: {
    // babel
    rules: [
      {
        test: /\.m?js$/, // работаем с js файлами
        exclude: /(node_modules|bower_components)/, // искл. node_modules
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', {
                debug: true,
                // установит только то что нужно
                corejs: 3,
                useBuiltIns: "usage"
            }]]
          }
        }
      }
    ]
  }
};
