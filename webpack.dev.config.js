const path = require('path');

const config = {
    entry: './js/app.js',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'app.bundle.js'
    },
    devServer: {
        publicPath: "/public/",
        contentBase: path.resolve(__dirname, "./views"),
        watchContentBase: true,
        open: true,
        openPage: "./index.html",
        inline: true,
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [path.resolve(__dirname, './js')],
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: ['style-loader','css-loader', 'sass-loader']
            }
        ]
    }
};

module.exports = config;