const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev


const cssLoaders = extra => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        hmr: isDev,
        reloadAll: true
      },
    },
    'css-loader'
  ]

  if (extra) {
    loaders.push(extra)
  }

  return loaders
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
    extensions: ['.js', '.jsx', '.json', '.scss', '.css'],
    alias:{
      '@styles':path.resolve(__dirname,"src/assets/styles"),
      '@':path.resolve(__dirname,"src")
    }
  },
  optimization:{
    splitChunks:{
      chunks:'all'
    },
    runtimeChunk:'single'
  },
  devServer:{
    port:4000
  },
  plugins: [
    new HTMLWebpackPlugin({ // create index.html and add in him links to scripts
      template: "./index.html",
      favicon: "./favicon.ico"
    }),
    new CleanWebpackPlugin() // cleaning from previous builds
  ],
  module: {
    rules: [ // types of processed files and their loaders
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        use: cssLoaders('less-loader')
      },
      {
        test: /\.s[ac]ss$/,
        use: ['sass-loader']
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