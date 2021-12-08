const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
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
    mode: "development",
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].[hash].js"
    },
    plugins: [
        new HTMLWebpackPlugin({ template: "./src/index.html" }),
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: cssLoaders()
              },
              {
                test: /\.less$/,
                use: cssLoaders('less-loader')
              },
              {
                test: /\.s[ac]ss$/,
                use: cssLoaders('sass-loader')
              },
              {
                test: /\.(png|jpg|svg|gif)$/,
                use: ['file-loader']
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