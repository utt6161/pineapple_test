var path = require('path');
var HtmlWebpackPlugin =  require('html-webpack-plugin');
const tailwindcss = require('tailwindcss')
const autoprefixer = require('autoprefixer')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const babelErrorBoundaries = require('@babel/plugin-transform-react-jsx-source')
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry : './src/index.tsx',
    output : {
        path : path.resolve(__dirname , 'dist'),
        filename: '[name].bundle.js',
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
                use: [MiniCssExtractPlugin.loader, 'css-loader', { // 'style-loader' conflicts with minicssextracter, bru
                    loader: 'postcss-loader', // postcss loader needed for tailwindcss
                    options: {
                        postcssOptions: {
                            ident: 'postcss',
                            plugins: [tailwindcss, autoprefixer],
                        },
                    },
                }]
            }
        ]
    },
    devServer: {
        port: 3000,
        hot: true,
    },
    plugins : [
        new HtmlWebpackPlugin ({
            template : './public/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'src/styles/[name].[contenthash].css',
            chunkFilename: '[id].[contenthash].css',
        }),
        //to enable env vars from vercel
        new Dotenv({ systemvars: true })

    ]

};