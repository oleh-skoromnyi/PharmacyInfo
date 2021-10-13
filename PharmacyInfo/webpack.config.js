const VueLoaderPlugin = require('vue-loader/lib/plugin');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    module: {
        rules: [
            { test: /\.js$/, use: 'babel-loader' },
            { test: /\.vue$/, use: 'vue-loader' },
            { test: /\.css$/, use: ['vue-style-loader', 'css-loader'] },
        ]
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename:"bundle.js"
    },
    plugins: [
        new VueLoaderPlugin()
    ]
}