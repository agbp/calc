const path = require('path');
const miniCSS = require('mini-css-extract-plugin');

module.exports = {
    mode: "development",
    entry: './src/index.ts',
    devtool: 'inline-source-map',
    module : {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: '/node_modules/',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i, 
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 100,
                        name: 'assets/fonts/[name].[ext]',
                    }
                }],
                exclude: [
                    '/node_modules/',
                    '/.vscode/',
                ],
            },
            {
                test: /\.s[ac]ss?$/i,
                use: [
                    miniCSS.loader,
                    'css-loader',
                    'sass-loader',
                ],
                exclude: '/node_modules/',
            }
        ],
    },
     plugins: [
        new miniCSS({
            filename: './styles/style.css',
        }),
    ],
    resolve: {
        extensions: ['.tsx','.ts','.js'],
    },
    output: {
        filename: 'js/bundle.js',
        path: path.resolve(__dirname,'dist'),
    },
};
