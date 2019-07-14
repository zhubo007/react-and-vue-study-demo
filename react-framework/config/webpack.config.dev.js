let path = require('path');
let {smart}=require('webpack-merge');
const base=require('./webpack.config.base');

module.exports=smart(base,{
    mode:'development',
    watch:true,//实时打包
    watchOptions:{
        poll:1000,//每秒问我1000次
        aggregateTimeout:500,//防抖500ms，开发键盘输入,停下的500ms
        ignored:/node_modules/
    },
    devServer:{
        port:3000,//端口
        progress:true,//打包进度条
        contentBase: path.resolve(__dirname, "./../dist"),//指向dist目录，最为静态服务
        // open:true,//默认打开浏览器
        hot:true,//开启热更新
        compress:true,//启动压缩
        disableHostCheck: true,
        historyApiFallback:true,
        host: '0.0.0.0',
        // proxy:{"/api":"http://127.0.0.1:8080/bob_demo"}//1.配置了一个代理
        // proxy:{//2.重写的方式，把请求代理到express服务器
        //     "api":{
        //         target:"http://127.0.0.1:8080/bob_demo",
        //         pathRewrite:{"api":""}
        //     }
        // }
    },
})