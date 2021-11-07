//HELLO WORDLD
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin')
//将样式压缩成CSS文件，而不写入到header中，不压缩内容
let MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 压缩JS文件
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
// 压缩CSS的内容 
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
let webpack=require('webpack');
module.exports = {
    optimization: {
        minimizer: [
          new UglifyJsPlugin({
            cache: true,//是否缓存
            parallel: true,//是否并发压缩
            sourceMap: true ,// set to true if you want JS source maps
          }),
          new OptimizeCSSAssetsPlugin({})
        ]
    },
    mode:'production',    //模式默认两种 development-production
    entry:'./src/index.tsx', //入口
    output:{
        filename:'[name][hash:8].js',
        path: path.resolve(__dirname,'dist'),//出口以当前目录解析出dist的绝对路径，此处必须是绝对路径
    },
    resolve:{
        extensions:['.js','.jsx','.css','.json'],//import文件依次解析
        modules:[path.resolve("node_modules")],
    },
    devServer:{
        port:3000,//端口
        progress:true,//打包进度条
        contentBase: path.resolve(__dirname, "./dist"),//指向build目录，最为静态服务
        // open:true,//默认打开浏览器
        // hot:true,//开启热更新
        compress:true,//启动压缩
        disableHostCheck: true,
        historyApiFallback:true,
        host: '0.0.0.0',
    },
    plugins:[//数组，所有的webpack的插件
        new HtmlWebpackPlugin({
            template:'./public/index.html',
            filename:'index.html',
            minify:{//最小化操作
                removeAttributeQuotes:true,//删除掉双引号
                collapseWhitespace:true,//折叠空行
            }
        }),
        new webpack.BannerPlugin('build 2019 by bob'),//加入版本作者注释
        new MiniCssExtractPlugin({
            filename:'[name].css',
            chunkFilename: "[id].css"
        }),
        new webpack.IgnorePlugin(/\.\/locale/,/moment/),//忽略插件中不用的语言包，可以减小打包的大小
        new webpack.DefinePlugin({//webpack自带的环境变量的插件
            DEV:JSON.stringify('production'),
        }),
        new webpack.DllReferencePlugin({
            manifest:path.resolve(__dirname,'dist','manifest.json')
        })
    ],
    module:{//模块
        rules:[
            {
                test:/\.(js|jsx)$/,//默认匹配所有的JS
                use:{
                    loader:'babel-loader',
                },
                exclude:/(node_modules|bower_components)/,//默认配置js，也会找node_modules，此时排除该目录
                include:path.resolve("src"),//只匹配src下的js
            },
            {
                test:/\.css$/,
                use:[
                    MiniCssExtractPlugin.loader,//'style-loader',
                    'css-loader',
                    'postcss-loader',
                ],
            },
            {
                test:/\.less$/,
                use:[
                    MiniCssExtractPlugin.loader,//'style-loader',
                    'css-loader',//@import 解析路径
                    'postcss-loader',
                    'less-loader' //把less转换成css文件
                ],
                exclude: /node_modules/,
            },
            {
                test:/\.(png|jpg|gif)$/,
                use:[
                    {
                        loader:'url-loader',
                        options:{
                            limit:1,
                            outputPath:'/img/',//打包时的写入路径
                        }
                    }
                ],
            },
            {//在模板中写图片地址，可以解析成正确的图片地址名称，一般file-loader会把图片解析成hash值名称
                test:/\.html$/,
                use:'html-withimg-loader'
            }
        ]
    }
}