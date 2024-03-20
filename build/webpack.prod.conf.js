const chalk = require('chalk')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const EslintWebpackPlugin = require('eslint-webpack-plugin')

const { VueLoaderPlugin } = require('vue-loader')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  mode: 'production',
  stats: 'minimal',
  entry: resolve('src/main.js'),
  output: {
    clean: true,
    filename: 'static/js/[name].[contenthash:8].js',
    path: path.join(__dirname,'../dist/'),
  },
  devtool: 'eval-source-map',
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      '@': resolve('src'),
      utils: resolve('src/utils'),
      '@assets': resolve('src/assets')
    },
    fallback: {
      path: require.resolve('path-browserify'),
      stream: require.resolve("stream-browserify"),
      "buffer": require.resolve("buffer/")
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        include: resolve('src'),
        loader: 'vue-loader'
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        include: resolve('src'),
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name].[hash:8][ext]'
        }
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: false
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    }),
    new VueLoaderPlugin()
  ]
}
