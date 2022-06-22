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
        static: [
            {
                directory: __dirname + '/src/css',
                watch: false
            },
            {
                directory: __dirname + '/src/js',
                watch: false
            },
            {
                directory: __dirname + '/src/plugins',
                watch: false
            },
            {
                directory: __dirname + '/src/images',
            }
        ],
        watchFiles: ['src/**/*.hbs'],
        compress: true,
        historyApiFallback: {
            rewrites: [
                { from: /^\/$/, to: '/index.html' },
                { from: /^\/portafolio\/design-agency$/, to: '/portafolio/design-agency.html' },
                { from: /^\/portafolio\/digital-actives$/, to: '/portafolio/digital-actives.html' },
                { from: /^\/portafolio\/personal-landing$/, to: '/portafolio/personallanding.html' },
                { from: /^\/portafolio\/personal-marketing-digital$/, to: '/portafolio/personalMarketingDigital.html' },
                { from: /^\/portafolio\/prosolutions$/, to: '/portafolio/prosolutions.html' },
                { from: /^\/portafolio\/spa-medico$/, to: '/portafolio/spa-medico.html' },
                { from: /^\/privacidad$/, to: '/privacidad.html' },
                { from: /./, to: '/404.html' }
            ]
        },
        port: 3000
    },
    module: {
        rules: [
            {
                test: /\.hbs$/,
                loader: "handlebars-loader",
                options: {
                    partialDirs: [__dirname + "/src/_partials"],
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/_templates/index.hbs'
        }),
        new HtmlWebpackPlugin({
            filename: 'portafolio/design-agency.html',
            template: './src/_templates/portafolio/design-agency.hbs'
        }),
        new HtmlWebpackPlugin({
            filename: 'portafolio/digital-actives.html',
            template: './src/_templates/portafolio/digital-actives.hbs'
        }),
        new HtmlWebpackPlugin({
            filename: 'portafolio/personallanding.html',
            template: './src/_templates/portafolio/personallanding.hbs'
        }),
        new HtmlWebpackPlugin({
            filename: 'portafolio/personalMarketingDigital.html',
            template: './src/_templates/portafolio/personalMarketingDigital.hbs'
        }),
        new HtmlWebpackPlugin({
            filename: 'portafolio/prosolutions.html',
            template: './src/_templates/portafolio/prosolutions.hbs'
        }),
        new HtmlWebpackPlugin({
            filename: 'portafolio/spa-medico.html',
            template: './src/_templates/portafolio/spa-medico.hbs'
        }),
        new HtmlWebpackPlugin({
            filename: 'privacidad.html',
            template: './src/_templates/privacidad.hbs'
        }),
        new HtmlWebpackPlugin({
            filename: '404.html',
            template: './src/_templates/404.hbs'
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