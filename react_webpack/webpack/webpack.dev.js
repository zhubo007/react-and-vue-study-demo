const {merge} = require('webpack-merge');
const common = require('./webpack.common');
const DEV_PORT = 10086;
const path = require('path')

// tell dev server to serve the html in dist
const outputPath = path.resolve(__dirname, '..', 'dist');

module.exports = merge(common, {
    mode: 'development',
    // shows a source map when in dev mode
    devtool: 'eval-source-map',
    devServer: {
        contentBase: outputPath,
        port: DEV_PORT,
        inline: true,
        hot: false,
        disableHostCheck: true,
        historyApiFallback: true,
        compress: true,
        host: '0.0.0.0',
        proxy: {
            '/app': {
                target: 'http://127.0.0.1:8080/mktm/api',
                changeOrigin: true,
                secure: false,
                pathRewrite: {'^/app': ''}
            }
        }
    },
});

