/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
// eslint-disable-next-line @typescript-eslint/no-var-requires
const MiniCSS = require('mini-css-extract-plugin');

module.exports = {
	mode: 'production',
	entry: './src/index.ts',
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
					MiniCSS.loader,
					'css-loader',
					'sass-loader',
				],
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
									}
			 */
		],
	},
	plugins: [
		new MiniCSS({
			filename: './styles/style.css',
		}),
	],
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	output: {
		filename: 'js/bundle.js',
		path: path.resolve(__dirname, 'prod'),
	},
};
