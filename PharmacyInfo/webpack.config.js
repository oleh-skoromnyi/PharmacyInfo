const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const path = require('path');

module.exports = {
    entry: './src/index.js',
    module: {
        rules: [
            { test: /\.cshtml$/, use: 'html-loader' },
            { test: /\.js$/, use: 'babel-loader' },
            { test: /\.vue$/, use: 'vue-loader' },
            { test: /\.css$/, use: ['vue-style-loader', 'css-loader'] },
        ]
    },
    output: {
        path: path.resolve(__dirname, "dist")
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: "body",
            filename: "./index.html"
        }),
        new VueLoaderPlugin()
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx','.vue'],
    },
};