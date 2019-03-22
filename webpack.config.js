const fs = require('fs');
const { join } = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');

const isProduction = process.argv.indexOf('-p') >= 0 || process.env.NODE_ENV === 'production';
const entryFile = fs.existsSync('./src/index.ts') ? './src/index.ts' : './src/index.js';

module.exports = {
    entry: ['@babel/polyfill', entryFile],
    devtool: "inline-source-map",
    output: {
        filename: 'bundle.js',
        path: join(__dirname, 'dist')
    },
    mode: isProduction ? 'production' : 'development',
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    },
                    'ts-loader'
                ]
            },
            {
                
                test: /\.css$/,
                use: [
                    'style-loader',
                    "css-loader",
                    "sass-loader"
                ]
            }
        ],
    },
    plugins: [
        new WriteFilePlugin(),
        new CopyWebpackPlugin([
            {
                from: join(__dirname, 'src/static'),
                to: join(__dirname, 'dist')
            }
        ])
    ],
    performance: {
        hints: false
    }
};