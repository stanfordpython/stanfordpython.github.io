const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: './example/bootstrap.jsx',
  output: {
    path: __dirname + '/example/',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      react: path.resolve(__dirname, './node_modules/react')
    }
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: [
          /node_modules/,
          /\*.spec.jsx?/
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          'url-loader?limit=10000',
          {
            loader: 'img-loader',
            options: {
              enabled: true,
              gifsicle: {
                interlaced: false
              },
              mozjpeg: {
                progressive: true,
                arithmetic: false
              },
              optipng: false,
              pngquant: {
                floyd: 0.5,
                speed: 2
              },
              svgo: {
                plugins: [
                  { removeTitle: true },
                  { convertPathData: false }
                ]
              }
            }
          }
        ]
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      }
    ]
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin()
  ]
};
