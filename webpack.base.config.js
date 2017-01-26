var path = require("path")
var webpack = require('webpack')
// Adicionado por causa do React-ToolBox ja que ele constroi em sass e dps tem q mudar para css
// var ExtractTextPlugin = require('extract-text-webpack-plugin')
// var autoprefixer = require('autoprefixer')

module.exports = {
  context: __dirname,

  entry: {
    // Add as many entry points as you have container-react-components here
    App1: './main_site/static/reactjs/App1',
    ReceitaApp: './main_site/static/reactjs/ReceitaApp',
    App: './main_site/static/reactjs/App',
    vendors: ['react'],
  },

  output: {
    // Modifica pra ele colocar os bundles criados aqui
      path: path.resolve('./main_site/static/bundles/local/'),
      filename: "[name]-[hash].js"
  },

  externals: {
  'react/addons': true,
  'react/lib/ExecutionEnvironment': true,
  'react/lib/ReactContext': true
  }, // add all vendor libs

  //It uses the CommonsChunksPlugin, this makes sure that ReactJS will be saved as a different file (vendors.js), 
  //so that our actual app-bundle doesn't become too big.
  plugins: [
    //new ExtractTextPlugin('bundle.css', { allChunks: true }),
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
  ], // add all common plugins here

  module: {
    loaders: [
    {
      test: /\.(jpe?g|png|gif|svg)$/i,
      loaders: [
        'file?hash=sha512&digest=hex&name=img-[hash].[ext]',
        'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
      ]
    },
    { test: /\.js$/, loader: 'exports-loader' }
    // {
    //     test: /(\.scss|\.css)$/,
    //     loader: ExtractTextPlugin.extract('style', 'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass')
    // }
    ] // add all common loaders here
  },
  // TB por causa do React-Toolbox
  // postcss: [autoprefixer],
  // sassLoader: {
  //   data: '@import "theme/_config.scss";',
  //   includePaths: [path.resolve(__dirname, './main_site/static/reactjs')]
  // },

  resolve: {
    modulesDirectories: ['node_modules', 'bower_components'],
    extensions: ['', '.js', '.jsx', '.scss', '.css']
  },
}