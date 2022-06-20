const path = require('path');
const miniCSS = require('mini-css-extract-plugin');

module.exports = {
	mode: "development",
	context: path.resolve(__dirname, 'src'),
	entry: './index.ts',
	devtool: 'inline-source-map',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: '/node_modules/',
			},
			{
				test: /\.s[ac]ss?$/i,
				use: [
					miniCSS.loader,
					'css-loader',
					'sass-loader',
				],
				exclude: '/node_modules/',
			},
			{
				test: /\.(txt|png)$/i,
				use: [{
					loader: 'file-loader',
					options: {
						limit: 100,
						name: 'assets/test/[name].[ext]',
					}
				}],
				exclude: '/node_modules/',
			},
			/*             {
											test: /\.(woff|woff2|eot|ttf|otf)$/i, 
											use: [{
													loader: 'file-loader',
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
			 */
		],
	},
	plugins: [
		new miniCSS({
			filename: './styles/style.css',
		}),
	],
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	output: {
		filename: 'js/bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
};
