/**
 * Created by jiangtao on 2017/5/17.
 */

const path = require('path');
const webpack = require('webpack');
const process = require('process');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const resolve = folder => path.resolve(__dirname, `../${folder}`);

const __DEV__ = process.env.NODE_ENV === 'dev';

const Hash8 = !__DEV__ ? '-[hash:8]' : '';

const antTheme = {
    'primary-color': '#00c1de',
};

//基本配置
const baseConfig = {
    // 入口
    entry: {
        common: [
            'babel-polyfill',
            'react',
            'react-dom'
        ],
        app: path.resolve(__dirname, '../src/app.js')
    },
    // 输出
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '',
        filename: `js/[name]${Hash8}.js`
    },
    // 加载器
    module: {
        rules: [
            {
                test: /\.js?$/,
                use: [`babel-loader`, `eslint-loader`],
                exclude: path => !!path.match(/node_modules/)
            },
            {
                test: /\.(css|scss|less)$/,
                include: resolve(`src`),
                exclude: resolve(`node_modules`),
                use: (__DEV__ ? [`css-hot-loader`] : []).concat([
                    `style-loader`,
                    {
                        loader: `css-loader`,
                        options: {
                            modules: true,
                            camelCase: true,
                            localIdentName: `${__DEV__ ? `[local]-` : ``}[hash:base64:16]`
                        }
                    },
                    `postcss-loader`,
                    `sass-loader`,
                    `less-loader`
                ])
            },
            {
                test: /\.(css|scss|less)$/,
                include: resolve(`node_modules`),
                exclude: resolve(`src`),
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        `css-loader`,
                        `postcss-loader`,
                        `sass-loader`,
                        {
                            loader: `less-loader`,
                            options: {
                                sourceMap: true,
                                modifyVars: antTheme
                            }
                        }
                    ]
                })
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: `url-loader?limit=20480&name=images/[name]${Hash8}.[ext]`
            },
            {
                test: /\.jpeg?$/,
                use: `file-loader?limit=20480&name=images/[name]${Hash8}.[ext]`
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: `file-loader?name=fonts/[name]${Hash8}.[ext]`
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: `url-loader?limit=10000&mimetype=application/font-woff&name=fonts/[name]${Hash8}.[ext]`
            }
        ],
    },
    resolve: {
        extensions: ['.js', '.scss']
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: `js/common${Hash8}.js`
        }),

        // 提取css,将它放在css文件夹下
        new ExtractTextPlugin({
            allChunks: true,
            filename: `css/[name]${Hash8}.css`
        }),

        //模板
        new HtmlWebpackPlugin({
            title: '',
            filename: 'app.html',
            template: 'tpl.html',
            chunks: ['common', 'app'],
            inject: false,
        })
    ]
};

module.exports = baseConfig;