const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const path = require('path');

module.exports = {
  entry: './pages/index.js',
  mode: "production",
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 8080,
  },
    plugins: [
        new HtmlWebpackPlugin({
        template: "index.html"
    }),
       new CleanWebpackPlugin(),
       new MiniCssExtractPlugin(),
    ],
    module: {
    rules: [{
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          }
        }
      },
    {
        test: /\.(png|jpg|svg|jpeg|woff(2)?|tff)$/,
        type: "asset/resource"
    }, {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, {  
            loader: "css-loader",
        options: { 
            importLoaders: 1
            
           }}, "postcss-loader"],
    }
]}
};