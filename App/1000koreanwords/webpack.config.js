const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: path.join(__dirname, "src", "index.js"),
    output: {
        path: path.join(__dirname, "build"),
        filename: "index.bundle.js",
        devtoolModuleFilenameTemplate: 'file:///[absolute-resource-path]',
        publicPath: '/'
    },
    mode: "development",
    resolve: {
        modules: [path.resolve(__dirname, "src"), "node_modules"],
        alias: { '@app': path.resolve(__dirname, 'src/') }
    },
    devServer: { static: path.join(__dirname, "src"), historyApiFallback:true },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            {
                test: /\.(css|scss)$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(jpg|jpeg|png|gif|mp3|svg|ico)$/,
                use: ["file-loader"]
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "src", "index.html"),
        }),
        new Dotenv()
    ],
};