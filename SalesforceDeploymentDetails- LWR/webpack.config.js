const path = require('path')
const LwcWebpackPlugin = require('lwc-webpack-plugin');
const webpack = require('webpack')

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'jsforce',
    libraryTarget: 'commonjs',
    libraryExport: 'default',
   // libraryTarget : 'umd',
    globalObject: 'this'
  },
  
  resolve: {
    alias: {
      process: 'process/browser'
    },
    fallback: {
      "timers": require.resolve("timers-browserify"),
      "buffer": require.resolve("buffer/"),
      "querystring": require.resolve("querystring-es3"),
      "stream": require.resolve("stream-browserify")
    }
  },
  plugins: [
    new LwcWebpackPlugin({

   }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer']
    })
  ]
}