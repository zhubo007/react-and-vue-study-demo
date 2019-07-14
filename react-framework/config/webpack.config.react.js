let path=require('path');
let webpack=require('webpack')
let CleanWebpackPlugin=require('clean-webpack-plugin');
// react 7.89=>2.81
//文件生成命令：npx webpack --config .\webpack.config.react.js
// 动态链接库
module.exports={
    mode:'development',
    entry:{
        react:['react','react-dom','react-redux','redux','redux-immutable','react-router-dom','redux-thunk','immutable',
        'antd','axios','moment','styled-components'],
    },
    output:{
        filename:'_dll_[name].js',//产生的文件名
        path: path.resolve(__dirname,'../dist'),
        library:'_dll_[name]',//入口产生文件_dll_react.js返回的变量
        libraryTarget:'var',//commonjs、var、this等
    },
    plugins:[
        new webpack.DllPlugin({
            name:'_dll_[name]',//要与library同名
            path:path.resolve(__dirname,'../dist','manifest.json'),//文件清单（或任务清单）
        }),
        new CleanWebpackPlugin(),
    ]
}