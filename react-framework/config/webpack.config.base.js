let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin')
//将样式压缩成CSS文件，而不写入到header中，不压缩内容
let MiniCssExtractPlugin = require('mini-css-extract-plugin')
let webpack=require('webpack');
// 1.56M 
module.exports = {
    entry:'./index', //入口
    context: path.resolve(__dirname, '../src'),
    output:{
        filename:'[name][hash:8].js',
        publicPath:'',
        path: path.resolve(__dirname,'../dist'),//出口以当前目录解析出dist的绝对路径，此处必须是绝对路径
    },
    resolve:{
        extensions:['.js','.jsx'],//import文件依次解析
        modules:[path.resolve(__dirname,"../node_modules")],//modules:[path.resolve("node_modules")],
    },
    plugins:[//数组，所有的webpack的插件
        new HtmlWebpackPlugin({
            template:'./../public/index.html',
            filename:'index.html',
            minify:{//最小化操作
                removeAttributeQuotes:true,//删除掉双引号
                collapseWhitespace:true,//折叠空行
            },
            inject: 'body', // 打完包之后，js存放的位置，true/'head'/'body'/false
        }),
        new webpack.BannerPlugin('build 2019 by bob'),//加入版本作者注释
        new MiniCssExtractPlugin({
            filename:'[name].css',
            chunkFilename: "[id].css"
        }),
        new webpack.IgnorePlugin(/\.\/locale/,/moment/),//忽略插件中不用的语言包，可以减小打包的大小
        new webpack.DefinePlugin({//webpack自带的环境变量的插件
            DEV:JSON.stringify('development'),
            BaseURL:JSON.stringify('http://127.0.0.1:8080/bob_demo')//DefinePlugin会将只加一个引号的环境变量，在引用时去掉该引号，此值为布尔值
        }),
        new webpack.DllReferencePlugin({
            manifest:path.resolve(__dirname,'../dist','manifest.json')
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
                include:path.resolve(__dirname,"../src"),//只匹配src下的js
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
                        loader: 'file-loader',
                        options: {
                            name: '[name]2.[ext]',
                            outputPath: 'img/'
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