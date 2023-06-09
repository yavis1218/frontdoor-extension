const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: {
        contentScript: path.join(__dirname, 'src/chrome/content.ts'),
        background: path.join(__dirname, 'src/chrome/background.ts'),
    },
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'static/js/[name].bundle.js',
        clean: true,
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [{
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: 'ts-loader'
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    'postcss-loader'
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'popup.html',
            chunks: ['popup']
        }),
        new MiniCssExtractPlugin()
    ]
};