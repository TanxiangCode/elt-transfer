module.exports = {
	pages: {
		index: {
			entry: 'examples/main.js',
			template: 'public/index.html',
			filename: 'index.html'
		}
	},
	chainWebpack: (config) => {
		config.module
			.rule('js')
			.include
				.add('/packages')
				.end()
			.use('babel')
				.loader('babel-loader')
				.tap(option => option)
	}
}