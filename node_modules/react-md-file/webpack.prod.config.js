const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/react-md-component.jsx',
  output: {
    library: 'reactMdComponent',
    libraryTarget: 'umd',
    path: __dirname + '/',
    publicPath: '/',
    filename: 'index.js'
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
  }
};
