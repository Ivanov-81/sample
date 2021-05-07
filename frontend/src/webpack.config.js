const path = require("path");
//const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const {CheckerPlugin} = require("awesome-typescript-loader");
// const {InjectManifest} = require('workbox-webpack-plugin');

module.exports = {
    entry: [
        "./index.js",
        "./styles.css",
        "./agreements.pdf",
        "./personal-data.pdf",
        "./confidential.pdf",
    ],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: ["ts-loader"]  
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            },
            {
                test: /\.css$/,
                exclude: "/node_modules/",
                use: ExtractTextPlugin.extract({
                    use: "css-loader"
                })
            },
            {
                test: /\.(jpe?g|gif|jpg|png|svg)$/,
                exclude: '/node_modules/',
                loader: 'file-loader',
                query: {
                    limit: 10000,
                    name: 'images/[name].[ext]'
                }
            },
            {
                test: /\.ico$/,
                exclude: '/node_modules/',
                loader: 'file-loader',
                query: {
                    limit: 10000,
                    name: '[name].[ext]'
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                exclude: '/node_modules/',
                loader: 'file-loader',
                query: {
                    name: 'fonts/[name].[ext]',
                }
            },
            {
                type: 'javascript/auto',
                test: /\.json$/,
                exclude: '/node_modules/',
                use: [{
                    loader: 'file-loader',
                    options: { name: '[name].[ext]' },
                }],
            },
            {
                test: /\.pdf$/,
                exclude: '/node_modules/',
                loader: 'file-loader',
                query: {
                    name: 'documents/[name].[ext]',
                }
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
    },
    plugins: [
        new CheckerPlugin(),
        new ExtractTextPlugin('styles.css'),
        new CompressionPlugin({
            filename: '[path].gz[query]',
            algorithm: "gzip",
            test: /\.js$|\.ts$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$/,
            threshold: 10240,
            minRatio: 0.8
        })
        // new InjectManifest({
        //     swSrc: '../../sw_loyalty.js',
        // })
    ]
};
