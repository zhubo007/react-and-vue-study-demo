const path = require('path');

const getPathFromSrc = (p) => {
    return path.resolve(__dirname, '..', 'src', p);
};

module.exports = {
    // entry tells webpack where to start packing
    entry: {
        main: './src/index.tsx',
    },
    // presets: [
    //     "@babel/plugin-proposal-function-bind",
    // ],
    // plugins: [
    //     require("@babel/plugin-syntax-dynamic-import"),
    //     [require("@babel/plugin-proposal-decorators"), { "legacy": true }],
    //     [require("@babel/plugin-proposal-class-properties"), { "loose": false }],
    // ],
    module: {
        rules: [
            // use ts-loader on tsx or ts files
            // {
            //     test: /\.tsx?$/,
            //     use: 'ts-loader',
            //     exclude: /node_modules/,
            // },
            {
                test: /\.(tsx|ts)?$/,
                use: [
                    {
                        loader: 'react-hot-loader/webpack'
                    }, {
                        loader: 'babel-loader'
                    }, {
                        loader: 'ts-loader'
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "less-loader"
                    }
                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
                // exclude: /node_modules/,
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
                test: /.(gif|jpg|jpeg| png|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024,
                            name: '[name]-xxx.[ext]'
                        }
                    }
                ]
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /node_modules/
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['react', 'env', 'stage-2'],
                        plugins: [['import', {"libraryName": "antd", "style": "css"}],
                            '@babel/plugin-proposal-class-properties']
                    }
                },
                include: path.resolve(__dirname, './src'),
            },
        ],
    },
    resolve: {
        // find modules with these paths in order
        extensions: ['.tsx', '.ts', '.js', '.jsx'],
        // use alias so that we don't have to use the ../.
        alias: {
            store: getPathFromSrc('store'),
            api: getPathFromSrc('api'),
            utils: getPathFromSrc('utils'),
            components: getPathFromSrc('components'),
        },
    },
};
