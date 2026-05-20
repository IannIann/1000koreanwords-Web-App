const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: path.join(__dirname, "src", "index.js"),
    output: {
        path: path.join(__dirname, "build"),
        filename: "index.bundle.js",
        publicPath: '/'
    },
    resolve: {
        modules: [path.resolve(__dirname, "src"), "node_modules"],
        alias: { '@app': path.resolve(__dirname, 'src/') }
    },
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
                type: "asset/resource"
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "src", "index.html"),
            favicon: path.join(__dirname, "src", "favicon.ico"),
        }),
        new CopyPlugin({
            patterns: [
                { from: "src/robots.txt", to: "robots.txt" },
                { from: "src/sitemap.xml", to: "sitemap.xml" },
            ],
        }),
    ],
};