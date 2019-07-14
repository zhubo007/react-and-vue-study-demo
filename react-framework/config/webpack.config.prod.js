let path = require('path');
let {smart}=require('webpack-merge');
const base=require('./webpack.config.base');
// 压缩JS文件
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
// 压缩CSS的内容
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports=smart(base,{
    mode:'production',
    optimization: {
        minimizer: [
          new UglifyJsPlugin({
            cache: true,//是否缓存
            parallel: true,//是否并发压缩
            sourceMap: true ,// set to true if you want JS source maps
            uglifyOptions: {
                compress: true
            }
          }),
          new OptimizeCSSAssetsPlugin({})
        ]
    },
    devtool: false,
    devServer:{
        port:3000,//端口
        progress:true,//打包进度条
        contentBase: path.resolve(__dirname, "./../dist"),//指向build目录，最为静态服务
        disableHostCheck: true,
        historyApiFallback:true,
        host: '0.0.0.0',
    },
})