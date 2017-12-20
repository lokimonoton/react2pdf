import webpack from 'webpack';
import path from 'path';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const SOURCE_PATH = path.resolve(__dirname, 'src');
const OUTPUT_PATH = path.resolve(__dirname, 'dist');
const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('development'),
  'global.IS_BROWSER': true
};
export default {
  debug: true,
  devtool: 'source-map',
  noInfo: false,
  entry: [
    'eventsource-polyfill', // necessary for hot reloading with IE
    'webpack-hot-middleware/client?reload=true', //note that it reloads the page if hot module reloading fails.
    './src/index'
  ],
  target: 'web',
  output: {
    path: OUTPUT_PATH, // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './src'
  },
  plugins: [
    new webpack.DefinePlugin({ 'process.env.API_HOST': process.env.API_HOST }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
        loaders: ['babel']
      },
      {
        test: /.jsx?$/, loader: 'babel-loader', exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react', 'es2017'],
          plugins: [
            'transform-class-properties',
            'transform-object-rest-spread',
            'transform-decorators-legacy',
            'transform-react-jsx',
            'transform-runtime'
          ]
        }
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      { test: /(\.css)$/, loaders: ['style', 'css'] },

      { test: /\.(png||jpg||jpeg||ico)(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
      { test: /\.gif$/, loader: 'file?name=[name].[ext]' },
      {
        test: /\.scss$/,
        loader: 'style!css!sass?sourceMap'
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff"
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader"
      }
    ]
  },
  resolve: {
        alias: {
            "ag-grid": path.resolve('./node_modules/ag-grid'),
            "ag-grid-enterprise": path.resolve('./node_modules/ag-grid-enterprise'),
            react: path.resolve('./node_modules/react')
        },
        extensions: ['', '.js', '.jsx']
    }
};
