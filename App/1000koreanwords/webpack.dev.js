const path = require("path");
const { merge } = require("webpack-merge");
const Dotenv = require('dotenv-webpack');
require('dotenv').config();
const common = require("./webpack.common.js");

const API_URL = `http://${process.env.API_HOST}:${process.env.API_PORT}`;
const API_PREFIX = `/api/${process.env.API_VERSION}`;

module.exports = merge(common, {
    mode: "development",
    devtool: "source-map",
    devServer: {
        static: path.join(__dirname, "src"),
        historyApiFallback: true,
        proxy: {
            '/api': {
                target: API_URL,
                changeOrigin: true,
                secure: false,
                pathRewrite: { '^/api': API_PREFIX }
            }
        }
    },
    plugins: [
        new Dotenv({ path: './.env' })
    ]
});