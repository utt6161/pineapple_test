var path = require('path');
var HtmlWebpackPlugin =  require('html-webpack-plugin');

module.exports = {
    entry : './src/index.tsx',
    output : {
        path : path.resolve(__dirname , 'dist'),
        filename: 'index.bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx','.ts', '.tsx']
    },
    module : {
        rules : [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    devServer: {
        port: 3000,
        hot: true
    },
    plugins : [
        new HtmlWebpackPlugin ({
            template : './public/index.html'
        })
    ]

};