var path = require("path")
var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')

module.exports = {
  context: __dirname,

  entry: ['whatwg-fetch', './game/assets/js/index',], // entry point of our app

  output: {
      path: path.resolve('./game/assets/bundles/'),
      filename: "[name]-[hash].js",
  },

  plugins: [
    new BundleTracker({filename: './webpack-stats.json'}),
  ],

  module: {
    loaders: [
      { 
        test: /\.jsx?$/, 
        exclude: /node_modules/, 
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'es2016']
        }
      }, // to transform JSX into JS
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      { 
        test: /\.less$/, 
        loader: "style-loader!css-loader!less-loader" 
      }, // transform less 
    ],
  },
  resolve: {
    root: [path.join(__dirname, "./game/assets/css")],
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.jsx']
  }
}