const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');


var config = {
    mode: 'development',
    entry:{
        webindex:"./src/index"
    },
    output:{
        filename:"[name].js",
        path:path.resolve(__dirname, '../dist'),
    },
    externals:{
        "react":"React",
        "react-dom":"ReactDOM",
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.css'] //表示这几种文件的后缀名可以省略，按照从前到后的方式来进行补全
    },
    devtool: 'source-map',// 输出 Source Map 方便在浏览器里调试 TypeScript 代码
    devServer: {
        contentBase: path.resolve(__dirname, "../dist"), //网站的根目录为 根目录/dist，这个路径一般与output.path一致，因为html插件生成的html5页是放在output.path这个目录下
        port: 9000,
        inline: true,
        hot: false,
        disableHostCheck: true,
        historyApiFallback:true,
        compress: true,
        host: '0.0.0.0',
        proxy:{
            '/app': {
                target: 'http://192.168.0.101:8080/mktm/api',
                changeOrigin: true,
                secure: false,
                pathRewrite: {'^/app': ''}
            }
        }
    },
    module:{
        rules:[
            {
                test: /\.(js|jsx)$/,
                exclude:/(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['react','env', 'stage-2'],
                        plugins: [['import', {"libraryName": "antd", "style": "css"}],
                            '@babel/plugin-proposal-class-properties']
                    }
                },
                include:path.resolve(__dirname, './src'),
            } ,
            {
                test: /\.tsx$/,
                use: ['ts-loader']
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]2.[ext]',
                            outputPath: 'img/'
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /.(gif|jpg|jpeg| png|svg)$/,
                use: [
                    {
                        loader:'url-loader',
                        options: {
                            limit:1024,
                            name: '[name]-xxx.[ext]'
                        }
                    }
                ]
            },
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: './src/templates/index.html',
            filename:"index.html",
            inject:'body',
            chunks:["webindex"]
        })
    ]
}

module.exports = config;