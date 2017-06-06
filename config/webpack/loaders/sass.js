const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require("autoprefixer")
const { env } = require('../configuration.js')

module.exports = {
  test: /\.(scss|sass|css)$/i,
  use: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [
      { loader: 'css-loader', options: {
        modules: true,
        minimize: env.NODE_ENV !== 'development',
        localIdentName: env.NODE_ENV === 'development' ? "[local]--[hash:base64:8]" : "[hash:base64:12]",
      } },
      { loader: 'postcss-loader', options: {
        sourceMap: true,
        plugins: () => [
          autoprefixer,
        ],
      } },
      'resolve-url-loader',
      { loader: 'sass-loader', options: { sourceMap: true } }
    ]
  })
}
