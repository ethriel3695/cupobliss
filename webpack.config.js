var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

var config = {
    entry: './app/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js',
        publicPath: '/'
    },
    module : {
        rules: [
            { test: /\.(js)$/, use: 'babel-loader' },
            { test: /\.css$/, use: [ 'style-loader', 'css-loader' ]},
            { test: /\.(jpe?g|png|gif|svg|webp)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'assets/img[name].[ext]'
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            query: {
                                mozjpeg: {
                                    progressive: true,
                                    quality: 65
                                },
                                gifsicle: {
                                    optimizationLevel: 7,
                                    interlaced: false,
                                },
                                optipng: {
                                    optimizationLevel: 7,
                                    interlaced: false
                                },
                                webp: {
                                    progressive: true,
                                    quality: 65
                                }
                            }
                        }
                    }]}
        ]},
    devServer: {
        historyApiFallback: true
    },
    plugins: [ 
        new HtmlWebpackPlugin({
        template: 'app/index.html'
    })]
};

if (process.env.NODE_ENV === 'production') {
    config.plugins.push(
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new webpack.optimize.UglifyJsPlugin()
    )
}

module.exports = config;