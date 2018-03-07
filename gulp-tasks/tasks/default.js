const gulp = require('gulp')
	, configs = require('../configs')
	, runSequence = require('run-sequence');

gulp.task('default', () => {
	configs.setEnv('development');
	configs.logEnv();
	runSequence(
		[/*'svg-font', 'favicons', 'icon-sprite',*/ 'sprite:svg', 'copy', 'scripts', 'images', 'bower', 'list-pages']
		, 'sass', 'nunjucks',/* 'pug',*/ 'server', 'watch');
});
