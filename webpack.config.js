const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')


const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all'
    },
    runtimeChunk: 'single'
  }
  if (isProd) { // minimize html css js
    config.minimizer = [ 
      new OptimizeCssAssetWebpackPlugin(),
      new TerserWebpackPlugin()
    ]
  }
  return config
}

module.exports = {
  context: path.resolve(__dirname, "src"),
  mode: "development", // operating mode webpack
  entry: "./index.js", // entry file
  output: {
    path: path.resolve(__dirname, "dist"),  // path to final build folder
    filename: "[name].[hash].js" // how to name files
  },
  resolve: {
    extensions: ['.js', '.jsx', '.png'],
    alias: {
      '@styles': path.resolve(__dirname, "src/assets/styles"),
      '@': path.resolve(__dirname, "src")
    }
  },
  optimization: optimization(),
  devServer: {
    port: 4000,
    hot: isDev
  },
  plugins: [
    new HTMLWebpackPlugin({ // create index.html and add in him links to scripts
      template: "./index.html",
      favicon: "./favicon.ico",
      minify: {
        collapseWhitespace: isProd
      }
    }),
    new CleanWebpackPlugin(), // cleaning from previous builds
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css'
    })
  ],
  module: {
    rules: [ // types of processed files and their loaders

      {
        test: /\.(sa|sc|c)ss$/, //sass scss css
        use: [
          isDev ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        type: 'asset/resource' // webpack v5+
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        use: ['file-loader']
      },
      {
        test: /\.xml$/,
        use: ['xml-loader']
      },
      {
        test: /\.csv$/,
        use: ['csv-loader']
      }


    ]
  }
}