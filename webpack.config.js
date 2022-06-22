const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: 'development',
    entry: './src/js/app.js',
    output: {
        path: __dirname + '/dist',
        filename: "bundle.js",
        clean: true
    },
    devServer: {
        liveReload: true,
        hot: true,
        open: false,
        static: ['./src'],
        port: 3000
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'portfolio-single.html',
            template: './src/portfolio-single.html'
        }),
        new CopyPlugin({
            patterns: [
                { from: "src/css", to: "css" },
                { from: "src/js", to: "js" },
                { from: "src/images", to: "images" },
                { from: "src/plugins", to: "plugins" }
            ]
        })
    ]
}; 