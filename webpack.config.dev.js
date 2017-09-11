import webpack from 'webpack';
import path from 'path';

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
  'process.env.BASE_APP': JSON.stringify(process.env.BASE_APP || 'http://localhost:3001/'),
  'process.env.SPOTIFY_WEB_API_AUTH_HOST': JSON.stringify(process.env.SPOTIFY_WEB_API_AUTH_HOST || 'https://accounts.spotify.com/'),
  'process.env.SPOTIFY_WEB_API_HOST': JSON.stringify(process.env.SPOTIFY_WEB_API_HOST || 'https://api.spotify.com/v1/'),
  'process.env.CLIENT_ID': JSON.stringify(process.env.CLIENT_ID || '4a1a2468c80f4ea09ed416f81c0fadf9'),
  'process.env.CLIENT_SECRET': JSON.stringify(process.env.CLIENT_SECRET || '1a15fe6ce40a4367b02662f1fdbe9f08')
};

export default {
  devtool: 'inline-source-map', // Inlines SourceMap into orginal file.
  entry: [
    'webpack-hot-middleware/client?reload=true',
    './app/index'
  ],
  target: 'web',
  output: {
    path: __dirname + '/dist', // Note: Physical files are only output by the production
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './app',
    hot: true
  },
  plugins: [
    new webpack.DefinePlugin(GLOBALS), //define variables to use on development
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: true
    })
  ],
  module: {
    rules: [{
      test: /\.js$/,
      include: path.join(__dirname, 'app'),
      use: [{
        loader: 'babel-loader'
      }]
    }, {
      enforce: 'pre',
      test: /\.scss/,
      loader: 'import-glob-loader'
    }, {
      test: /(\.css)$/,
      use: [{
        loader: 'style-loader'
      }, {
        loader: 'css-loader'
      }]
    }, {
      test: /(\.scss)$/,
      use: [{
        loader: 'style-loader'
      }, {
        loader: 'css-loader'
      }, {
        loader: 'postcss-loader',
        options: {
          plugins: function () {
            return [
              require('autoprefixer')
            ];
          }
        }
      }, {
        loader: 'sass-loader'
      }]
    }, {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      use: [{
        loader: 'file-loader'
      }]
    }, {
      test: /\.(woff|woff2)$/,
      use: [{
        loader: 'url-loader',
        options: {
          prefix: 'font',
          limit: 5000
        }
      }]
    }, {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'application/octet-stream'
        }
      }]
    }, {
      test: /\.(jpe?g|png|gif|svg)$/i,
      use: [
        'url-loader?limit=10000', {
          loader: 'img-loader',
          options: {
            gifsicle: {
              interlaced: false
            },
            mozjpeg: {
              progressive: true,
              arithmetic: false
            },
            optipng: false, // disabled
            pngquant: {
              floyd: 0.5,
              speed: 2
            },
            svgo: {
              plugins: [{
                  removeTitle: true
                }, {
                  convertPathData: false
                }
              ]
            }
          }
        }
      ]
    }]
  }
};
