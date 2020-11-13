const nodeMode = process.env.NODE_ENV == "production"
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
    mode: nodeMode ? "production" : "development",
    entry: "./src/mainCode.js",
    output: {
        filename: "main.js",
        path: __dirname + "/public"
    },
    devServer:{
        contentBase: "./public",
        port: 9000
    },
    optimization: {
        minimizer: [
            new UglifyWebpackPlugin({
                cache: true,
                parallel: true
            }),
            new OptimizeCssAssetsPlugin({})
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "style.css"
        })
    ],
    module: {
        rules: [
            {
                test: /\.s?[ac]ss$/,
                use: 
                [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.(jpg|png|gif|jpeg)$/,
                use: ["file-loader"]
            }
        ]
    }
}