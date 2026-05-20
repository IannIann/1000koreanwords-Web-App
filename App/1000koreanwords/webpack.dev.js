const path = require("path");
const { merge } = require("webpack-merge");
const Dotenv = require('dotenv-webpack');
const common = require("./webpack.common.js");

module.exports = merge(common, {
    mode: "development",
    devtool: "source-map",
    devServer: {
        static: path.join(__dirname, "src"),
        historyApiFallback: true,
    },
    plugins: [
        new Dotenv({ path: './.env' })
    ]
});