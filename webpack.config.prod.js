import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
  'process.env.API_HOST': JSON.stringify(process.env.API_HOST || '')
};

export default {
  devtool: 'source-map',
  entry: './app/index',
  target: 'web',
  output: {
    path: __dirname + '/dist', // Note: Physical files are only output by the production
    publicPath: '/',
    filename: 'bundle.[hash].js'
  },
  devServer: {
    contentBase: './dist',
    historyApiFallback: true,
    compress: true
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(), //optimize the order of the files bundled
    new webpack.DefinePlugin(GLOBALS), //define variables to use on production
    new ExtractTextPlugin('styles.[hash].css'), //extract css on different files
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
      },
      output: {
        comments: false,
      },
    }), //Minify our Javascript
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new HtmlWebpackPlugin({
      template: 'tools/index-dist.html'
    })
  ],
  module: {
    rules: [{
      enforce: 'pre',
      test: /\.scss/,
      loader: 'import-glob-loader'
    }, {
      test: /\.js$/,
      include: path.join(__dirname, 'app'),
      use: [{
        loader: 'babel-loader'
      }]
    }, {
      test: /(\.css)$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader'
        }]
      })
    }, {
      test: /(\.scss)$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [{
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
      })
    }, {
      test: /\.font\.(js|json)$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader'
        }, {
          loader: 'webfonts-loader'
        }]
      })
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
        'url-loader?limit=10000',
        'img-loader'
      ]
    }]
  }
};
