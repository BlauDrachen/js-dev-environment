import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

// tslint:disable:object-literal-sort-keys

export default {
    mode: 'development',
    resolve: {
      extensions: ['*', '.js', '.jsx', '.json']
    },

    devtool: 'source-map',
    entry: {
        vendor: path.resolve(__dirname, 'src/vendor'),
        main: path.resolve(__dirname, 'src/index')
    },
    target: 'web',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: '[name].[chunkhash].js'
    },
    // Webpack 4 removed the commonsChunkPlugin. Use optimization.splitChunks instead.
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all'
                }
            }
        }
    },
    plugins: [
        // Generate an external css file with a hash in the filename
        new ExtractTextPlugin('[name].[md5:contenthash:hex:20].css'),

        // Hash the files using MD5 so that their names change when the content changes.
        new WebpackMd5Hash(),

        // No longer used fro webpack 4
        // // Create separate bundle for vendor libs so they cache separately
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'vendor'
        // }),

        // Create HTML file that includes reference to bundled JS
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            }
        })
    ],
    module: {
        rules: [
            {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
            {test: /\.css$/, use: ExtractTextPlugin.extract('css-loader?sourceMap')}
        ]
    }
};
